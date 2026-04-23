import { queryStringToObject, useLocation } from '@staff-portal/navigation'
import { useEffect, useMemo } from 'react'
import { localStorageService } from '@staff-portal/local-storage-service'
import { ENVIRONMENT } from '@staff-portal/config'

const ENABLE_ALL_PATHS_QUERY_PARAM_KEY = 'enableAllPaths'
const LOCAL_STORAGE_KEY = 'all-paths-are-enabled-by-user'

export const useRouteRedirectDisabledByUser = () => {
  const { search } = useLocation()
  const { isFlagPresent, enableAllPaths } = useMemo(() => {
    if (ENVIRONMENT === 'production') {
      return { isFlagPresent: false, enableAllPaths: false }
    }

    const queryParameters = queryStringToObject(search)
    const isPresent = ENABLE_ALL_PATHS_QUERY_PARAM_KEY in queryParameters

    return {
      isFlagPresent: isPresent,
      enableAllPaths:
        isPresent &&
        queryParameters[ENABLE_ALL_PATHS_QUERY_PARAM_KEY] !== 'false'
    }
  }, [search])

  useEffect(() => {
    if (isFlagPresent) {
      localStorageService.setItem(LOCAL_STORAGE_KEY, enableAllPaths)
    }
  }, [isFlagPresent, enableAllPaths])

  if (ENVIRONMENT === 'production') {
    return false
  }

  return (
    enableAllPaths ||
    localStorageService.getItem<boolean>(LOCAL_STORAGE_KEY) ||
    false
  )
}
