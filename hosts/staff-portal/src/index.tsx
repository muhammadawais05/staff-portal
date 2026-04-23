import React from 'react'
import ReactDOM from 'react-dom'
import type {} from 'styled-components/cssprop'
import {
  ENVIRONMENT,
  ERROR_TRACKING_IS_ENABLED,
  LOG_ROCKET_APPID,
  LOG_ROCKET_HOSTNAME,
  CUCUMBER_MODE,
  LOG_ROCKET_IS_ENABLED,
  RELEASE_COMMIT_HASH,
  SENTRY_DSN,
  DATA_DOG_IS_ENABLED,
  DATA_DOG_APPID,
  DATA_DOG_CLIENT_TOKEN,
  DATA_DOG_SERVICE,
  DATA_DOG_SITE,
  PLATFORM_API_URL
} from '@staff-portal/config'
import {
  initMonitoringService,
  wrapWithPerformanceProfiler
} from '@staff-portal/monitoring-service'

import { setupCucumber } from './topkit/cucumber'
// eslint-disable-next-line no-restricted-imports
import App from './hosts/main'

const AppWithPerformanceProfiler = wrapWithPerformanceProfiler(App)

if (CUCUMBER_MODE) {
  setupCucumber()
}

initMonitoringService({
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
  DATA_DOG_SERVICE,
  DATA_DOG_SITE,
  PLATFORM_API_URL
})

ReactDOM.render(<AppWithPerformanceProfiler />, document.getElementById('root'))
