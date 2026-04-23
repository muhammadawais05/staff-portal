import * as Sentry from '@sentry/react'
import React from 'react'

import AnalyticsTracker from '.'
import renderComponent from '../../utils/tests'

jest.mock('@sentry/react')
jest.mock('../../config/_helper/config', () => ({
  SENTRY_DSN: 'exampleSentryDNS',
  APP_NAME: 'billing-frontend',
  PACKAGE_VERSION: '1.1.100'
}))
jest.mock('../../_lib/helpers/host', () => ({
  getEnvironment: () => 'test'
}))
jest.mock('@sentry/tracing', () => ({
  Integrations: {
    // prettier-ignore
    BrowserTracing: function() {
      return { name: 'browser-tracer-integration' }
    }
  }
}))

const render = (props = {}) => renderComponent(<AnalyticsTracker {...props} />)

describe('AnalyticsTracker', () => {
  describe('Sentry integration', () => {
    describe('when `isSentryEnabled` is `false`', () => {
      it('does not initialize Sentry script', () => {
        render()

        expect(Sentry.init).not.toHaveBeenCalled()
      })
    })

    describe('when `isSentryEnabled` is `true`', () => {
      it('initializes Sentry script', () => {
        render({ shouldInitErrorLogging: true })
        expect(Sentry.init).toHaveBeenCalledWith({
          blacklistUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i, /safari-extension/],
          dsn: 'exampleSentryDNS',
          environment: 'test',
          integrations: [{ name: 'browser-tracer-integration' }],
          ignoreErrors: [
            'Non-Error promise rejection captured with keys:',
            `TypeError: Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'.`
          ],
          normalizeDepth: 10,
          release: 'billing-frontend@1.1.100',
          whitelistUrls: [/assets\/platform_react_billing/i]
        })
      })
    })
  })
})
