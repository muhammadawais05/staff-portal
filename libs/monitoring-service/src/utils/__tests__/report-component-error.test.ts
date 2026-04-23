import * as Sentry from '@sentry/react'

import reportComponentError from '../report-component-error'
import { SentryContextName } from '../config'

describe('reportComponentError', () => {
  const error = new Error('Test Error')

  const reactError = {
    componentStack: 'react-error'
  }

  const APP_NAME = 'staff-portal'
  const PACKAGE_VERSION = '1.0.1'

  it('reports exception to Sentry', () => {
    const captureExceptionSpy = jest
      .spyOn(Sentry, 'captureException')
      .mockImplementation(jest.fn())

    reportComponentError(error, reactError, {
      APP_NAME: 'staff-portal',
      PACKAGE_VERSION: '1.0.1'
    })

    expect(captureExceptionSpy).toHaveBeenCalledWith(error, {
      contexts: {
        Error: reactError
      },
      tags: {
        appName: APP_NAME,
        version: PACKAGE_VERSION
      }
    })
  })

  it('reports exception to Sentry with the Severity specified', () => {
    const sentrySeverity = Sentry.Severity.Warning
    const captureExceptionSpy = jest
      .spyOn(Sentry, 'captureException')
      .mockImplementation(jest.fn())

    reportComponentError(
      error,
      reactError,
      {
        APP_NAME,
        PACKAGE_VERSION
      },
      sentrySeverity
    )

    expect(captureExceptionSpy).toHaveBeenCalledWith(error, {
      contexts: {
        [SentryContextName.Error]: reactError
      },
      level: sentrySeverity,
      tags: {
        appName: APP_NAME,
        version: PACKAGE_VERSION
      }
    })
  })
})
