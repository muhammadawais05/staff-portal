import { Operation } from '@apollo/client'
import * as Sentry from '@sentry/react'
import { GraphQLError } from 'graphql'

import { SentryContextName } from './config'

export const reportGraphqlErrors = ({
  appName,
  packageVersion,
  errors,
  level = Sentry.Severity.Error,
  operation: {
    operationName,
    variables: operationVariables,
    query: operationQuery
  }
}: {
  appName: string
  packageVersion: string
  level?: Sentry.Severity
  errors: readonly GraphQLError[] | undefined
  operation: Operation
}) =>
  errors?.forEach((error: GraphQLError) => {
    Sentry.captureMessage(error.message, {
      level,
      tags: {
        apolloErrorType: 'GraphQLError',
        appName,
        version: packageVersion
      },
      contexts: {
        [SentryContextName.GraphQLRequest]: {
          operationName,
          operationVariables,
          operationQuery
        },
        ...((!error.extensions || !error.extensions.code) && {
          [SentryContextName.Endpoint]: {
            error: 'Missing "error.extensions.code"'
          }
        }),
        [SentryContextName.Error]: { ...error }
      }
    })
  })
