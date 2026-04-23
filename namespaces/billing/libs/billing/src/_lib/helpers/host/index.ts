const PRODUCTION_URL = 'toptal.com'
const STAGING_URL = 'toptal.net'
const TEMPLOY_URL = 'toptal.rocks'

export const getEnvironment = () => {
  const host = window?.location?.host

  if (host.includes(PRODUCTION_URL)) {
    return 'production'
  } else if (host.includes(STAGING_URL)) {
    return 'staging'
  } else if (host.includes(TEMPLOY_URL)) {
    return 'temploy'
  }

  return 'testing'
}

export const isEnvProduction = () => {
  const env = getEnvironment()

  return env === 'production'
}
