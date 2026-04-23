import { ErrorInfo } from 'react'
import * as Sentry from '@sentry/react'

import { SentryContextName } from './config'

type ErrorConfig = {
  APP_NAME: string
  PACKAGE_VERSION: string
}

const reportComponentError = (
  error: Error,
  errorInfo: ErrorInfo,
  { APP_NAME, PACKAGE_VERSION }: ErrorConfig,
  errorSeverityLevel?: Sentry.Severity
  // eslint-disable-next-line max-params
) => {
  try {
    Sentry.captureException(error, {
      level: errorSeverityLevel,
      tags: {
        appName: APP_NAME,
        version: PACKAGE_VERSION
      },
      contexts: {
        [SentryContextName.Error]: { ...errorInfo }
      }
    })
  } catch (caughtError) {
    if (caughtError instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error occurred while reporting error to Sentry: ' + caughtError.message
      )
    }
  }
}

export default reportComponentError
