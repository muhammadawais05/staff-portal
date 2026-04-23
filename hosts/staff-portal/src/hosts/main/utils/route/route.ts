import {
  createUrl,
  RouteType,
  RouteData,
  URLType,
  getOrigin,
  matchPath,
  isAbsoluteUrlWithoutProtocol
} from '@staff-portal/navigation'
import { LEGACY_PATH_PREFIX, PLATFORM_API_URL } from '@staff-portal/config'
import {
  getLegacyUrl,
  getLegacyUrlWithRewrite,
  Route
} from '@staff-portal/routes'

const OLD_PLATFORM_URL_PREFIX = '/platform'

const parseUrl = (path: string) => {
  try {
    // if absolute url misses protocol
    const processedPath = isAbsoluteUrlWithoutProtocol(path)
      ? `https://${path}`
      : path

    return createUrl(processedPath, getOrigin())
  } catch {
    return null
  }
}

const hasOldStaffPrefix = (pathname: string) =>
  pathname.indexOf(LEGACY_PATH_PREFIX) >= 0

const isInternalUrl = ({ origin, pathname }: URLType) =>
  (origin === PLATFORM_API_URL && hasOldStaffPrefix(pathname)) ||
  origin === getOrigin()

const isUniversalLinkForMultipleDomains = (pathname: string) => {
  if (!pathname) {
    return false
  }

  const hasOldPlatformPrefix = pathname.indexOf(OLD_PLATFORM_URL_PREFIX) >= 0

  return hasOldPlatformPrefix && !hasOldStaffPrefix(pathname)
}

const rewriteUrl = (
  { pathname, search, hash }: URLType,
  allRoutes: Route[]
): RouteData => {
  if (isUniversalLinkForMultipleDomains(pathname)) {
    return { url: `${PLATFORM_API_URL}${pathname}${search}${hash}` }
  }

  const pathnameWithoutPrefix = pathname.replace(LEGACY_PATH_PREFIX, '') || '/'

  const isPathEnabled = allRoutes.some(({ path: routePath }) =>
    matchPath(pathnameWithoutPrefix, {
      path: routePath,
      exact: true,
      strict: false
    })
  )

  if (isPathEnabled) {
    return { url: `${pathnameWithoutPrefix}${search}${hash}`, as: 'RouterLink' }
  }

  const legacyUrl = hasOldStaffPrefix(pathname)
    ? getLegacyUrl(`${pathnameWithoutPrefix}${search}${hash}`)
    : getLegacyUrlWithRewrite(pathnameWithoutPrefix, search, hash)

  return { url: legacyUrl }
}

const route: (allRoutes: Route[]) => RouteType = allRoutes => path => {
  const parsedUrl = parseUrl(path)

  if (parsedUrl) {
    if (isInternalUrl(parsedUrl)) {
      return rewriteUrl(parsedUrl, allRoutes)
    }

    return { url: parsedUrl.href }
  }

  return { url: path }
}

export default route
