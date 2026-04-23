import { CUCUMBER_MODE, ENVIRONMENT } from '@staff-portal/config'
import { RouteAvailability, ROUTES } from '@staff-portal/routes'

const getAppRoutes = () => {
  // we need this filtering since the result will be passed
  // to topkit router for links generation
  if (ENVIRONMENT === 'production' && !CUCUMBER_MODE) {
    return ROUTES.filter(
      ({ availability }) => availability !== RouteAvailability.IN_DEVELOPMENT
    )
  }

  if (CUCUMBER_MODE) {
    return ROUTES.filter(({ cucumberMode }) => cucumberMode)
  }

  return ROUTES
}

export default getAppRoutes
