/// <reference types="cypress" />

import { MockGraphQLResponse, MockGraphQLResult } from './mockGraphQL'

export interface SetupServer {
  operationName: string
  defaultResponses: Record<string, MockGraphQLResult>
  overriddenResponses?: Record<string, MockGraphQLResult>
  variables?: object
}

export interface MockedCall {
  operationName: string
  variables?: object
}

export const MockedCalls: MockedCall[] = []

export default ({
  operationName,
  defaultResponses,
  overriddenResponses = {},
  variables = {}
}: SetupServer): MockGraphQLResponse => {
  MockedCalls.push({ operationName, variables })

  const mockedResponse = overriddenResponses[operationName]
  const defaultResponse = defaultResponses[operationName]

  if (mockedResponse) {
    return {
      mockResult: mockedResponse
    }
  } else if (operationName) {
    return {
      mockResult: defaultResponse
    }
  }

  // eslint-disable-next-line no-console
  console.log('>>>> Endpoint not found', operationName)

  return {
    mockResult: {}
  }
}
