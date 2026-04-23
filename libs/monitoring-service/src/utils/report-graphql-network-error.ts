import { Operation, ServerError } from '@apollo/client'
import * as Sentry from '@sentry/react'
import { ExecutionResult } from 'graphql'

import { SentryContextName } from './config'

export const reportGraphqlNetworkError = ({
  appName,
  packageVersion,
  error,
  response,
  operation: {
    operationName,
    variables: operationVariables,
    query: operationQuery
  }
}: {
  appName: string
  packageVersion: string
  error: ServerError
  response?: ExecutionResult
  operation: Operation
}) => {
  Sentry.captureException(error, {
    level: Sentry.Severity.Warning,
    tags: {
      apolloErrorType: 'NetworkError',
      appName,
      version: packageVersion
    },
    contexts: {
      [SentryContextName.GraphQLRequest]: {
        operationName,
        operationVariables,
        operationQuery
      },
      [SentryContextName.GraphQLResponse]: {
        response
      }
    }
  })
}
