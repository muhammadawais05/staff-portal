import { FetchResult, Operation, Observable } from '@apollo/client'
import { GraphQLError } from 'graphql'
// TODO: remove cross-lib references https://toptal-core.atlassian.net/browse/SPB-2526
import { reportGraphqlErrors } from '@staff-portal/monitoring-service'

import { createApplicationGraphQLErrorHandler } from './create-application-graphql-error-handler'
import { handleTosNotAcceptedRequest } from './handle-tos-not-accepted-request'
import { handleUnauthenticatedRequest } from './handle-unauthenticated-request'
import { handleUnauthorizedPortalRequest } from './handle-unauthorized-portal-request'

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  Observable: class ObservableMock {
    constructor(handler: () => void) {
      handler()
    }
  }
}))

jest.mock('@staff-portal/monitoring-service', () => ({
  reportGraphqlErrors: jest.fn(() => null)
}))

jest.mock('./handle-tos-not-accepted-request', () => ({
  handleTosNotAcceptedRequest: jest.fn()
}))
jest.mock('./handle-unauthenticated-request', () => ({
  handleUnauthenticatedRequest: jest.fn()
}))
jest.mock('./handle-unauthorized-portal-request', () => ({
  handleUnauthorizedPortalRequest: jest.fn()
}))

const mockedReportGraphqlErrors = reportGraphqlErrors as jest.Mock

const mockQueryOperation: Operation = {
  operationName: 'MockQuery',
  extensions: {},
  setContext: () => ({}),
  getContext: () => ({}),
  query: {
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        name: {
          kind: 'Name',
          value: 'example operation name'
        },
        operation: 'query',
        selectionSet: {
          kind: 'SelectionSet',
          selections: []
        }
      }
    ]
  },
  variables: { a: 'test', b: 'niceVar' }
}

const graphqlErrorHandler = createApplicationGraphQLErrorHandler({
  appName: 'test-app',
  packageVersion: '1.1.111'
})

const createGqlError = (message: string, code: string) =>
  new GraphQLError(message, null, null, null, null, null, { code })

describe('#createApplicationGraphQLErrorHandler', () => {
  describe('when a critical error caught', () => {
    it('should observe UNAUTHENTICATED without Sentry report', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {
          errors: [createGqlError('example message 2', 'UNAUTHENTICATED')]
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      const observable = graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
      expect(observable).toBeDefined()
      expect(handleUnauthenticatedRequest).toHaveBeenCalledTimes(1)
    })

    it('should observe TOS_UNACCEPTED without Sentry report', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {
          errors: [createGqlError('example message 2', 'TOS_UNACCEPTED')]
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      const observable = graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
      expect(observable).toBeDefined()
      expect(handleTosNotAcceptedRequest).toHaveBeenCalledTimes(1)
    })

    it('should observe UNAUTHORIZED_PORTAL without Sentry report', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {
          errors: [createGqlError('example message 2', 'UNAUTHORIZED_PORTAL')]
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      const errorHandlerObservable = graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
      expect(errorHandlerObservable).toBeDefined()
      expect(handleUnauthorizedPortalRequest).toHaveBeenCalledTimes(1)
    })
  })

  describe('when an unhandled error caught', () => {
    it('should handle EMPTY without reporting errors', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {
          data: { nodes: [null] },
          errors: [createGqlError('example message 2', 'EMPTY')]
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      const observable = graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
      expect(observable).toBeUndefined()
    })

    it('should handle UNAUTHORIZED without reporting errors', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {
          data: { nodes: [null] },
          errors: [createGqlError('example message 2', 'UNAUTHORIZED')]
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      const observable = graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
      expect(observable).toBeUndefined()
    })
  })

  describe('when error with specific code was caught', () => {
    it('reports error', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {
          errors: [createGqlError('example message 2', 'specific code')]
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).toHaveBeenCalledTimes(1)
    })
  })

  describe('if response is `undefined`', () => {
    it('does not report errors', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: undefined,
        forward: () => new Observable<FetchResult>(() => {})
      }

      graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
    })
  })

  describe('if NO `graphQLErrors`', () => {
    it('does not report errors', () => {
      const errorData = {
        operation: mockQueryOperation,
        response: {},
        forward: () => new Observable<FetchResult>(() => {})
      }

      graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
    })
  })

  describe('if EMPTY `graphQLErrors`', () => {
    it('does not report errors', () => {
      const errorData = {
        operation: {
          ...mockQueryOperation,
          operationName: 'example operation name'
        },
        response: {
          errors: []
        },
        forward: () => new Observable<FetchResult>(() => {})
      }

      graphqlErrorHandler(errorData)

      expect(mockedReportGraphqlErrors).not.toHaveBeenCalled()
    })
  })
})
