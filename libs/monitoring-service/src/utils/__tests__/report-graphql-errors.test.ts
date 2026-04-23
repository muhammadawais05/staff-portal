import { Operation } from '@apollo/client'
import * as Sentry from '@sentry/react'
import { GraphQLError } from 'graphql'

import { reportGraphqlErrors } from '../report-graphql-errors'
import { SentryContextName } from '../config'

describe('reportGraphqlErrors', () => {
  const errors = [
    {
      message: 'Error 1',
      extensions: 'Extension Code 1'
    }
  ] as unknown as GraphQLError[]

  const operation = {
    operationName: 'operationName',
    variables: { a: 1, b: 2 },
    query: 'Query'
  } as unknown as Operation

  const APP_NAME = 'staff-portal'
  const PACKAGE_VERSION = '1.0.1'

  it('performs captureMessage', () => {
    const captureMessageSpy = jest
      .spyOn(Sentry, 'captureMessage')
      .mockImplementation(jest.fn())

    reportGraphqlErrors({
      appName: APP_NAME,
      packageVersion: PACKAGE_VERSION,
      errors,
      operation
    })

    expect(captureMessageSpy).toHaveBeenCalled()
    expect(captureMessageSpy).toHaveBeenCalledWith(errors[0].message, {
      contexts: {
        [SentryContextName.Endpoint]: {
          error: 'Missing "error.extensions.code"'
        },
        [SentryContextName.Error]: errors[0],
        [SentryContextName.GraphQLRequest]: {
          operationName: operation.operationName,
          operationQuery: operation.query,
          operationVariables: operation.variables
        }
      },
      level: 'error',
      tags: {
        apolloErrorType: 'GraphQLError',
        appName: APP_NAME,
        version: PACKAGE_VERSION
      }
    })
  })
})
