import LogRocket from 'logrocket'
import * as Sentry from '@sentry/react'
import setupLogRocketReact from 'logrocket-react'
import { datadogRum } from '@datadog/browser-rum'

import initMonitoringService from '../init-monitoring-service'

jest.mock('@sentry/react')
jest.mock('@topkit/sentry-logrocket-integration', () => ({
  // prettier-ignore
  LogRocketSessionIntegration: function() {
    return { name: 'log-rocket-session-integration' }
  }
}))
jest.mock('logrocket-react')

jest.mock('@sentry/tracing', () => ({
  Integrations: {
    // prettier-ignore
    BrowserTracing: function() {
      return { name: 'browser-tracer-integration' }
    }
  }
}))

jest.mock('@datadog/browser-rum')

const testConfig = {
  LOG_ROCKET_IS_ENABLED: false,
  ERROR_TRACKING_IS_ENABLED: false,
  ENVIRONMENT: 'test-env',
  LOG_ROCKET_APPID: 'test-logrocket-app-id',
  LOG_ROCKET_HOSTNAME: 'test-logrocket-host',
  RELEASE_COMMIT_HASH: 'test-commit-hash',
  SENTRY_DSN: 'test-sentry-dsn',
  DATA_DOG_IS_ENABLED: false,
  DATA_DOG_APPID: 'test-data-dog-app-id',
  DATA_DOG_CLIENT_TOKEN: 'test-data-dog-client-token',
  DATA_DOG_SITE: 'test-data-dog-site',
  DATA_DOG_SERVICE: 'test-data-dog-service',
  PLATFORM_API_URL: 'test.toptal.net'
}

const expectedSentrySettings = {
  dsn: testConfig.SENTRY_DSN,
  environment: testConfig.ENVIRONMENT,
  release: testConfig.RELEASE_COMMIT_HASH,
  integrations: [
    { name: 'log-rocket-session-integration' },
    { name: 'browser-tracer-integration' }
  ],
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Chunk',
    new RegExp(`500|501|502|503|504|505|506|507|509|510`, 'mi'),
    'AbortError: Fetch is aborted',
    'NetworkError when attempting to fetch resource',
    'Failed to fetch',
    '-extension',
    'GraphQL introspection is not allowed by Apollo Server',
    `TypeError: Failed to update a ServiceWorker for scope ('https://staff.toptal.com/') with script ('https://staff.toptal.com/service-worker.js'): An unknown error occurred when fetching the script`,
    'SecurityError: The operation is insecure'
  ],
  denyUrls: [
    /lr-ingest\.io/,
    /segment\.com/,
    /extensions\//i,
    /^chrome-extension:\/\//i,
    /^chrome:\/\//i
  ],
  normalizeDepth: 10,
  tracesSampleRate: 0.1
}

describe('initMonitoringService', () => {
  describe('when Datadog is enabled in config', () => {
    it('initializes Datadog monitoring service', () => {
      datadogRum.init = jest.fn()

      initMonitoringService({ ...testConfig, DATA_DOG_IS_ENABLED: true })

      expect(datadogRum.init).toHaveBeenCalledWith({
        applicationId: testConfig.DATA_DOG_APPID,
        clientToken: testConfig.DATA_DOG_CLIENT_TOKEN,
        site: testConfig.DATA_DOG_SITE,
        service: testConfig.DATA_DOG_SERVICE,
        version: testConfig.RELEASE_COMMIT_HASH,
        env: testConfig.ENVIRONMENT,
        sampleRate: 100,
        trackInteractions: true,
        allowedTracingOrigins: ['test.toptal.net'],
        defaultPrivacyLevel: 'mask-user-input'
      })
    })
  })

  describe('when Datadog is disabled in config', () => {
    it('does not initialize Datadog monitoring service', () => {
      datadogRum.init = jest.fn()

      initMonitoringService(testConfig)

      expect(datadogRum.init).not.toHaveBeenCalled()
    })
  })

  describe('LogRocket is enabled', () => {
    it('inits logrocket and integrates with react', () => {
      const setupLogRocketReactMock = setupLogRocketReact as jest.Mock

      LogRocket.init = jest.fn()
      initMonitoringService({ ...testConfig, LOG_ROCKET_IS_ENABLED: true })

      expect(LogRocket.init).toHaveBeenCalledWith(testConfig.LOG_ROCKET_APPID, {
        rootHostname: testConfig.LOG_ROCKET_HOSTNAME
      })
      expect(setupLogRocketReactMock).toHaveBeenCalledWith(LogRocket)
    })
  })

  describe('LogRocket is disabled', () => {
    it('does not init logrocket', () => {
      const setupLogRocketReactMock = setupLogRocketReact as jest.Mock

      LogRocket.init = jest.fn()
      initMonitoringService(testConfig)

      expect(LogRocket.init).not.toHaveBeenCalled()
      expect(setupLogRocketReactMock).not.toHaveBeenCalled()
    })
  })

  describe('Error tracking is enabled', () => {
    it('inits sentry with proper integrations', () => {
      const sentryInitSpy = jest.spyOn(Sentry, 'init')

      initMonitoringService({ ...testConfig, ERROR_TRACKING_IS_ENABLED: true })

      expect(sentryInitSpy).toHaveBeenCalledWith(expectedSentrySettings)
    })
  })

  describe('Error tracking is disabled', () => {
    it('does not init sentry', () => {
      const sentryInitSpy = jest.spyOn(Sentry, 'init')

      initMonitoringService(testConfig)

      expect(sentryInitSpy).not.toHaveBeenCalled()
    })
  })
})
