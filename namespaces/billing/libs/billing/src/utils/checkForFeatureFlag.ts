import { localStorageService } from '@staff-portal/local-storage-service'

const STORAGE_ENABLED_VALUE = 'true'
const STORAGE_DISABLED_VALUE = 'false'

const setFeatureFlag = (key: string) => {
  localStorageService.setItem(key, STORAGE_ENABLED_VALUE)
}

const unsetFeatureFlag = (key: string) => {
  localStorageService.removeItem(key)
}

/**
 * __checkForFeatureFlag__
 *
 * Checks for a feature flag from URL params or localStorage and saves the state when set to ?flag=true
 * Unsets the flag and return false when ?flag=false is in URL params
 *
 * @param key A unique key for URL params that will be saved in localStorage
 *
 * @example
 * const thingEnabled = checkForFeatureFlag('testFeature');
 */
export const checkForFeatureFlag = (key: string) => {
  const params = new URLSearchParams(window.location.search)
  const keyValue = params.get(key)

  if (keyValue) {
    if (keyValue === STORAGE_DISABLED_VALUE) {
      unsetFeatureFlag(key)

      return false
    }
    setFeatureFlag(key)
  }

  return Boolean(localStorageService.getItem(key))
}
