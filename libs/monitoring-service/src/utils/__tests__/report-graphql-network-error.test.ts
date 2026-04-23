import { Operation, ServerError } from '@apollo/client'
import * as Sentry from '@sentry/react'

import { reportGraphqlNetworkError } from '../report-graphql-network-error'
import { SentryContextName } from '../config'

describe('reportGraphqlNetworkError', () => {
  const error = { message: 'Server Error' } as unknown as ServerError

  const operation = {
    operationName: 'operationName',
    variables: { a: 1, b: 2 },
    query: 'Query'
  } as unknown as Operation

  const response = {
    data: {
      foo: 'bar'
    }
  }

  const APP_NAME = 'staff-portal'
  const PACKAGE_VERSION = '1.0.1'

  it('reports exception to Sentry', () => {
    const captureExceptionSpy = jest
      .spyOn(Sentry, 'captureException')
      .mockImplementation(jest.fn())

    reportGraphqlNetworkError({
      appName: APP_NAME,
      packageVersion: PACKAGE_VERSION,
      error,
      operation,
      response
    })

    expect(captureExceptionSpy).toHaveBeenCalledWith(error, {
      contexts: {
        [SentryContextName.GraphQLRequest]: {
          operationName: operation.operationName,
          operationQuery: operation.query,
          operationVariables: operation.variables
        },
        [SentryContextName.GraphQLResponse]: {
          response
        }
      },
      level: 'warning',
      tags: {
        apolloErrorType: 'NetworkError',
        appName: APP_NAME,
        version: PACKAGE_VERSION
      }
    })
  })
})
