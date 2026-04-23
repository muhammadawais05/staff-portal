import { RouteAvailability } from '@staff-portal/routes'
import { CUCUMBER_MODE, ENVIRONMENT } from '@staff-portal/config'

export const shouldSkipRouteRedirect = (
  routeAvailability: RouteAvailability,
  isRedirectDisabledByUser: boolean
) => {
  // user can bypass beta redirects for all route types only in non production environments
  if (isRedirectDisabledByUser && ENVIRONMENT !== 'production') {
    return true
  }

  // all route types are enabled in cucumber mode or test environment
  if (CUCUMBER_MODE || ENVIRONMENT === 'test') {
    return true
  }

  // 'IN_DEVELOPMENT' routes are enabled in development and temploy environments
  return (
    routeAvailability === RouteAvailability.IN_DEVELOPMENT &&
    (ENVIRONMENT === 'development' || ENVIRONMENT === 'temploy')
  )
}
