import {
  CHRONICLES_SCHEMA_PATH,
  GATEWAY_SCHEMA_PATH,
  LENS_SCHEMA_PATH,
  PLATFORM_SCHEMA_PATH
} from '~integration/config'
import { FakeCall, OperationValue } from '~integration/types'
import {
  getBatchOperationResponse,
  getSingleOperationResponse,
  isStub,
  stubResponse
} from '~integration/utils'

let controller: AbortController
let signal: AbortSignal
let originalFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
let FETCH_OPERATIONS: { [key: string]: OperationValue } = {}

const getFetchStub = (
  win: Cypress.AUTWindow,
  { as, callsFake }: { as: string; callsFake: FakeCall }
) => {
  if (!isStub(win.fetch)) {
    originalFetch = win.fetch
    const stub = cy.stub(win, 'fetch')

    stub
      .as(as)
      .callsFake((input, init) => callsFake(input, { ...init, signal }))

    cy.on('test:after:run', () => {
      FETCH_OPERATIONS = {}
    })
  }
}

beforeEach(() => {
  controller = new AbortController()
  signal = controller.signal
})

afterEach(() => {
  // aborting all unfinished requests to prevent `authentication` errors
  controller.abort()
})

export const stubGraphQLRequests = (operations?: {
  [key: string]: OperationValue
}) => {
  FETCH_OPERATIONS = { ...FETCH_OPERATIONS, ...operations }

  const fetchGraphQL = (path: string, options?: RequestInit) => {
    if (
      !path.includes(GATEWAY_SCHEMA_PATH) &&
      !path.includes(LENS_SCHEMA_PATH) &&
      !path.includes(CHRONICLES_SCHEMA_PATH) &&
      !path.includes(PLATFORM_SCHEMA_PATH)
    ) {
      return originalFetch(path, options)
    }

    try {
      const requestBody = JSON.parse((options?.body as string) ?? {})

      if (Array.isArray(requestBody)) {
        const result = getBatchOperationResponse(FETCH_OPERATIONS, requestBody)

        if (result.length) {
          return stubResponse(result)
        }
      } else {
        const result = getSingleOperationResponse(FETCH_OPERATIONS, requestBody)

        if (result) {
          return stubResponse(result)
        }
      }

      return originalFetch(path, options)
    } catch (err) {
      throw new Error('Unable to stub request')
    }
  }

  cy.on('window:before:load', win => {
    getFetchStub(win, {
      as: 'fetchGraphQL',
      callsFake: fetchGraphQL
    })
  })

  /**
   * Based on the documentation, https://docs.cypress.io/api/commands/stub#Automatic-reset-restore-between-tests,
   * all stubs are automatically restored between tests, which means that the "windows.fetch" function is restored
   * after each test and created again when "window:before:load" is triggered.
   * To make the test work with only one "page.visit" per test file, the "windows.fetch" function should be stubbed again.
   */
  // eslint-disable-next-line promise/catch-or-return
  cy.window().then(win => {
    getFetchStub(win, {
      as: 'fetchGraphQL',
      callsFake: fetchGraphQL
    })

    return
  })
}
