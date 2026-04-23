/// <reference types="cypress" />

import { ApolloError } from '@apollo/client'
import Sinon from 'cypress/types/sinon'
import { event, eventNS } from 'eventemitter2'

// Mimic `fetch` for GQL behave
const responseStub = (
  result: MockGraphQLResult | MockGraphQLResult[],
  { headers }: { headers?: string[][] | Record<string, string> | Headers } = {}
) => {
  return Promise.resolve({
    ok: true,
    headers,
    json() {
      return Promise.resolve(result)
    },
    text() {
      return Promise.resolve(JSON.stringify(result))
    }
  })
}

const filterArray = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { [key in K]?: any },
  K extends keyof T = keyof T
>(
  array: T[],
  key: K,
  forceHasData = false
): T[K] | T[K][] | undefined => {
  const everyElementHasData =
    forceHasData ||
    (array as unknown as { mockResult: unknown }[]).every(
      ({ mockResult }) => !!mockResult
    )

  return everyElementHasData
    ? array.length === 1
      ? array[0][key]
      : array.map(element => element[key])
    : undefined
}

interface ParsedOperation {
  operationName: string
  query: string
  variables: { [key: string]: unknown }
}

export type MockGraphQLResult = Record<string, unknown>
type MockGraphQLTest = (obj: object) => void

export type MockGraphQLResponse = {
  mockResult: MockGraphQLResult
  error?: Error
  test?: MockGraphQLTest
}

export type MockGraphQL = (
  operationName: string,
  variables?: object
) => MockGraphQLResponse

const getVariablesFromPath = (path: string) => {
  const queryStringParams = path.split('?').pop()?.split('&') || ''
  const params: Record<string, string> = {}

  const decode = decodeURIComponent

  for (let idx = queryStringParams.length; idx > 0; ) {
    const pair = queryStringParams[--idx].split('=')

    params[decode(pair[0])] = decode(pair[1])
  }

  return params
}

export default (getOperationMock: MockGraphQL) => {
  const fetchRestGQL = (
    path: string,
    options: { body?: string; headers?: Headers } = {}
  ) => {
    const { headers } = options

    try {
      // a tricky workaround to pass operation name
      const operationName = headers?.get('operationName') || path
      const variables = getVariablesFromPath(path)

      if (!operationName) {
        return Promise.reject(new Error(`Operation name not found for ${path}`))
      }

      const parsedOperation = getOperationMock(operationName, variables)
      const {
        mockResult: { data: result },
        error
      } = parsedOperation

      if (error) {
        return Promise.reject(error)
      }

      if (result) {
        return responseStub(result as MockGraphQLResult, { headers })
      }

      return Promise.reject(
        new Error(`No mock for operation \`${JSON.stringify(operationName)}\``)
      )
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const fetchGraphQL = (
    path: string,
    options: { body?: string; headers?: unknown } = {}
  ) => {
    const { body } = options

    try {
      const parsedBody: ParsedOperation | ParsedOperation[] = JSON.parse(
        body as string
      )
      const data = Array.isArray(parsedBody) ? parsedBody : [parsedBody]
      const parsedOperation = data.map(({ operationName, variables }) =>
        getOperationMock(operationName, variables)
      )
      const result = filterArray(parsedOperation, 'mockResult')
      const error = filterArray(parsedOperation, 'error')
      const operationName = filterArray(data, 'operationName', true)

      if (
        error &&
        !(Array.isArray(error) && error.filter(Boolean).length === 0)
      ) {
        return Promise.reject(error)
      }

      if (result && !(Array.isArray(result) && result.length === 0)) {
        Cypress.on(
          'uncaught:exception',
          (err: Error | ApolloError | event | eventNS) => {
            if (err instanceof ApolloError && err.networkError === 'EMPTY') {
              console.error(
                `The result is empty - make sure that your '${operationName}' operation mock contains the proper key, like 'node' or 'nodes'. Check the real results for comparison.`
              )
            }
          }
        )

        return responseStub(result)
      }

      return Promise.reject(
        new Error(`No mock for operation \`${JSON.stringify(operationName)}\``)
      )
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return cy.on('window:before:load', win => {
    const previousStubbedFetch = win.fetch as Cypress.Agent<Sinon.SinonStub>

    if (previousStubbedFetch.restore) {
      previousStubbedFetch.restore()
    }

    const stubbedFetch = cy.stub(win, 'fetch')

    // stubbedFetch.withArgs('/billing/graphql').callsFake(fetchGraphQL)
    stubbedFetch
      .withArgs(Cypress.sinon.match('cypress.stubbed.fetch/'))
      .callsFake(fetchRestGQL)
    stubbedFetch
      .withArgs(Cypress.sinon.match('/gateway/graphql/staff/graphql'))
      .callsFake(fetchGraphQL)
  })
}
