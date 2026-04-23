export const APP_NAME = process.env.DAVINCI_APP_NAME as string
export const SENTRY_DSN = process.env.DAVINCI_SENTRY_DSN as string
export const PACKAGE_VERSION = process.env.DAVINCI_RELEASE_VERSION as string
export const DAVINCI_CUCUMBER_MODE =
  process.env.DAVINCI_CUCUMBER_MODE === 'true' ||
  process.env.DAVINCI_CUCUMBER_MODE === '1'
export const ENVIRONMENT = process.env.NODE_ENV

export const PLATFORM_URL = process.env.PLATFORM_URL as string
// Until the bin/set-up-env.sh active, Davinci env variables are ignored
export const DAVINCI_API_GATEWAY_URL = process.env
  .DAVINCI_API_GATEWAY_URL as string
export const DAVINCI_PLATFORM_API_URL = process.env.PLATFORM_URL as string
export const DAVINCI_KIPPER_API_URL = process.env.KIPPER_URL as string
export const USE_REMOTE_API = DAVINCI_PLATFORM_API_URL !== ''
export const CYPRESS_MODE = process.env.NODE_ENV === 'test'
