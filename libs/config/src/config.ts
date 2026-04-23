/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'
// FIXME: PACKAGE_VERSION needs to be read from package.json, but currently
//  there is no way to reliably reference to package.json,
//  see https://toptal-core.atlassian.net/browse/SPB-996
// import packageJson from '../package.json'

const getVariable = <T extends string = string>(
  name: string,
  environmentVariable?: string
): T => {
  if ((window as any).SP) {
    return (window as any).SP[name]
  }

  return environmentVariable as T
}

export const PLATFORM_API_URL = getVariable(
  'DAVINCI_PLATFORM_API_URL',
  process.env.DAVINCI_PLATFORM_API_URL
)
export const KIPPER_API_URL = getVariable(
  'DAVINCI_KIPPER_API_URL',
  process.env.DAVINCI_KIPPER_API_URL
)

export const LEGACY_PATH_PREFIX = '/platform/staff'
export const TOPTAL_TITLE = 'Toptal®'
/**
 * @deprecated : use explicit page size for each page to avoid product behavior changes for being released pages
 */
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_LIMIT_OPTIONS = [10, 15, 20, 25]
export const DEFAULT_AUTOCOMPLETE_RESULTS_SIZE = 6
export const DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE = 4
export const DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT = 'No results'
export const DEFAULT_INPUT_DEBOUNCE_DELAY = 300
export const CHRONICLES_DEFAULT_POLL_INTERVAL = 15000
export const NO_VALUE = '—'
export const NUMBER_OF_ITEMS_DISPLAY_LIMIT = 10000
export const NUMBER_OF_CHARACTER_LIMIT = 65000 // According to https://toptal-core.atlassian.net/browse/SP-483
export const STAFF_SCHEMA_VERSION = 'V1'
export const PRODUCT_NAME = 'Staff Portal'
export const APP_NAME = 'staff-portal'
// see FIXME at the top of this file
// export const PACKAGE_VERSION = packageJson.version
export const PACKAGE_VERSION = '0.0.0'

export const DEBOUNCE_LIMIT = 500

// Current environment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ENVIRONMENT = getVariable<EnvironmentTypes>(
  'DAVINCI_ENV',
  process.env.DAVINCI_ENV
)

export const CUCUMBER_MODE =
  process.env.DAVINCI_CUCUMBER_MODE === 'true' ||
  process.env.DAVINCI_CUCUMBER_MODE === '1'

export const CYPRESS_MODE = ENVIRONMENT === 'test'

// Derived constants
export const LEGACY_STAFF_PORTAL_URL = PLATFORM_API_URL + LEGACY_PATH_PREFIX

export const LOG_ROCKET_APPID = getVariable(
  'DAVINCI_LOG_ROCKET_APPID',
  process.env.DAVINCI_LOG_ROCKET_APPID
)
export const LOG_ROCKET_HOSTNAME = getVariable(
  'DAVINCI_LOG_ROCKET_HOSTNAME',
  process.env.DAVINCI_LOG_ROCKET_HOSTNAME
)

export const DATA_DOG_APPID = getVariable(
  'DAVINCI_DATA_DOG_APP_ID',
  process.env.DAVINCI_DATA_DOG_APP_ID
)
export const DATA_DOG_CLIENT_TOKEN = getVariable(
  'DAVINCI_DATA_DOG_CLIENT_TOKEN',
  process.env.DAVINCI_DATA_DOG_CLIENT_TOKEN
)
export const DATA_DOG_SITE = getVariable(
  'DAVINCI_DATA_DOG_SITE',
  process.env.DAVINCI_DATA_DOG_SITE
)
export const DATA_DOG_SERVICE = getVariable(
  'DAVINCI_DATA_DOG_SERVICE',
  process.env.DAVINCI_DATA_DOG_SERVICE
)

export const PERFORMANCE_MONITORING_IS_ENABLED =
  ENVIRONMENT !== 'production' && !CUCUMBER_MODE

// Environments to enable tracking services like Segment, LogRocket and DataDog
const USER_TRACKING_ENABLED_ENVIRONMENTS = ['production', 'staging']

export const USER_TRACKING_IS_ENABLED =
  USER_TRACKING_ENABLED_ENVIRONMENTS.includes(ENVIRONMENT)
export const LOG_ROCKET_IS_ENABLED = Boolean(
  USER_TRACKING_IS_ENABLED && LOG_ROCKET_APPID
)
export const DATA_DOG_IS_ENABLED = Boolean(
  USER_TRACKING_IS_ENABLED && DATA_DOG_APPID
)

// Environments to enable error tracking services like Sentry
const ERROR_TRACKING_ENABLED_ENVIRONMENTS = ['production', 'staging']

export const ERROR_TRACKING_IS_ENABLED =
  ERROR_TRACKING_ENABLED_ENVIRONMENTS.includes(ENVIRONMENT)

export const SENTRY_DSN = getVariable(
  'DAVINCI_SENTRY_DSN',
  process.env.DAVINCI_SENTRY_DSN
)

// Variable provided by Davinci https://github.com/toptal/davinci/tree/master/packages/engine#available-environment-variables
export const RELEASE_COMMIT_HASH = getVariable(
  'DAVINCI_RELEASE_VERSION',
  process.env.DAVINCI_RELEASE_VERSION
)

export const TIMEZONE_FILTER_MIN = -43200 // -12 hours
export const TIMEZONE_FILTER_MAX = 50400 // 14 hours
export const TIMEZONE_FILTER_STEP = 3600 // 1 hour

export const MAX_INT_LENGTH = 11 // Legacy Platform's default setting

export const NOT_SELECTED_OPTION = {
  label: 'Not Selected',
  text: 'Not Selected',
  value: ''
}

export const NOT_SELECTED_PLACEHOLDER = 'Not Selected'
