import deepEqual from 'deep-equal'
import { Location } from 'history'
import { queryStringToObject } from '@staff-portal/navigation'
import { LEGACY_PATH_PREFIX } from '@staff-portal/config'

const checkPathsMatch = (
  legacyUrl: string,
  pathname: string,
  queryParams: ReturnType<typeof queryStringToObject>
) => {
  const [legacyPathName, legacySearch] = legacyUrl
    .replace(LEGACY_PATH_PREFIX, '')
    .split('?')

  if (legacyPathName !== pathname) {
    return false
  }

  if (!legacySearch) {
    return true
  }

  const legacyQueryParams = queryStringToObject(legacySearch)

  return Object.entries(legacyQueryParams).every(([key, value]) =>
    deepEqual(value, queryParams[key])
  )
}

export const getActiveMenuItemPath = (
  menu: { path?: string | null; items: { path?: string | null }[] }[],
  { pathname, search }: Location
): string | null => {
  const queryParams = queryStringToObject(search)

  for (const { items, path } of menu) {
    if (!items.length && path && checkPathsMatch(path, pathname, queryParams)) {
      return path
    }

    const activeMenuItem = items.find(
      ({ path: nestedPath }) =>
        nestedPath && checkPathsMatch(nestedPath, pathname, queryParams)
    )

    if (activeMenuItem?.path) {
      return activeMenuItem.path
    }
  }

  return null
}
