import LogRocket from 'logrocket'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { LogRocketSessionIntegration } from '@topkit/sentry-logrocket-integration'
import setupLogRocketReact from 'logrocket-react'
import { datadogRum } from '@datadog/browser-rum'

type Config = {
  ENVIRONMENT: string
  ERROR_TRACKING_IS_ENABLED: boolean
  LOG_ROCKET_APPID: string
  LOG_ROCKET_HOSTNAME: string
  LOG_ROCKET_IS_ENABLED: boolean
  RELEASE_COMMIT_HASH: string
  SENTRY_DSN: string
  DATA_DOG_IS_ENABLED: boolean
  DATA_DOG_APPID: string
  DATA_DOG_CLIENT_TOKEN: string
  DATA_DOG_SITE: string
  DATA_DOG_SERVICE: string
  PLATFORM_API_URL: string
}

export const initMonitoringService = ({
  ENVIRONMENT,
  ERROR_TRACKING_IS_ENABLED,
  LOG_ROCKET_APPID,
  LOG_ROCKET_HOSTNAME,
  LOG_ROCKET_IS_ENABLED,
  RELEASE_COMMIT_HASH,
  SENTRY_DSN,
  DATA_DOG_IS_ENABLED,
  DATA_DOG_APPID,
  DATA_DOG_CLIENT_TOKEN,
  DATA_DOG_SITE,
  DATA_DOG_SERVICE,
  PLATFORM_API_URL
}: Config) => {
  if (LOG_ROCKET_IS_ENABLED) {
    LogRocket.init(LOG_ROCKET_APPID, { rootHostname: LOG_ROCKET_HOSTNAME })
    setupLogRocketReact(LogRocket)
  }

  if (ERROR_TRACKING_IS_ENABLED) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: ENVIRONMENT,
      release: RELEASE_COMMIT_HASH,
      integrations: [
        new LogRocketSessionIntegration(),
        new Integrations.BrowserTracing()
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
        // LogRocket integration
        /lr-ingest\.io/,
        // Segment integration
        /segment\.com/,
        // Chrome extensions
        /extensions\//i,
        /^chrome-extension:\/\//i,
        /^chrome:\/\//i
      ],
      // Retain deeply nested objects in ADDITIONAL DATA section
      normalizeDepth: 10,
      // Perf tracking
      tracesSampleRate: 0.1
    })
  }

  if (DATA_DOG_IS_ENABLED) {
    datadogRum.init({
      applicationId: DATA_DOG_APPID,
      clientToken: DATA_DOG_CLIENT_TOKEN,
      site: DATA_DOG_SITE,
      service: DATA_DOG_SERVICE,
      version: RELEASE_COMMIT_HASH,
      env: ENVIRONMENT,
      sampleRate: 100,
      trackInteractions: true,
      allowedTracingOrigins: [PLATFORM_API_URL],
      defaultPrivacyLevel: 'mask-user-input'
    })
  }
}

export default initMonitoringService
