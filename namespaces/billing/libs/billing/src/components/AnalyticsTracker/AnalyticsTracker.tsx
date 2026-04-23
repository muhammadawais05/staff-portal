import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { memo } from 'react'

import * as Config from '../../config/_helper/config'
import * as hostHelpers from '../../_lib/helpers/host'

const displayName = 'AnalyticsTracker'

export const enableErrorLogging = () =>
  Sentry.init({
    blacklistUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
      /safari-extension/
    ],
    dsn: Config.SENTRY_DSN,
    environment: hostHelpers.getEnvironment(),
    ignoreErrors: [
      'Non-Error promise rejection captured with keys:',
      `TypeError: Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'.`
    ],

    // retain deeply nested objects in ADDITIONAL DATA section
    normalizeDepth: 10,
    release: `${Config.APP_NAME}@${Config.PACKAGE_VERSION}`,
    integrations: [new Integrations.BrowserTracing()],
    whitelistUrls: [
      // billing code part itself
      /assets\/platform_react_billing/i
    ]
  })

interface Props {
  shouldInitErrorLogging?: boolean
}

const AnalyticsTracker = ({ shouldInitErrorLogging }: Props) => {
  if (shouldInitErrorLogging) {
    enableErrorLogging()
  }

  return null
}

AnalyticsTracker.displayName = displayName

export default memo(AnalyticsTracker)
