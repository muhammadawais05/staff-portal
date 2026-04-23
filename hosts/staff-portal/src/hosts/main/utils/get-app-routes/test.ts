import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'
import {
  Route,
  RouteAvailability,
  RouteExperimentKey,
  RoutePath
} from '@staff-portal/routes'

import getAppRoutes from './get-app-routes'

const mockEnvironment = jest.fn<EnvironmentTypes, []>()
const mockCucumberMode = jest.fn<boolean, []>()
const mockRoutes = jest.fn<Route[], []>()

jest.mock('@staff-portal/config', () => ({
  get ENVIRONMENT() {
    return mockEnvironment()
  },
  get CUCUMBER_MODE() {
    return mockCucumberMode()
  }
}))

jest.mock('@staff-portal/routes', () => ({
  ...jest.requireActual('@staff-portal/routes'),
  get ROUTES() {
    return mockRoutes()
  }
}))

describe('getAppRoutes', () => {
  describe('when in production environment', () => {
    it('should filter out `IN_DEVELOPMENT` routes', () => {
      const PROD_ROUTE: Route = {
        path: '' as RoutePath,
        availability: RouteAvailability.RELEASED
      }
      const DEVELOPMENT_ROUTE: Route = {
        path: '' as RoutePath,
        availability: RouteAvailability.IN_DEVELOPMENT
      }

      mockEnvironment.mockReturnValue('production')
      mockRoutes.mockReturnValue([PROD_ROUTE, DEVELOPMENT_ROUTE])

      const filteredRoutes = getAppRoutes()

      expect(filteredRoutes).toEqual([PROD_ROUTE])
    })
  })
  describe('when cucumber mode is enabled', () => {
    describe.each(['production', 'development'] as EnvironmentTypes[])(
      'when in `%s` environment',
      environment => {
        it('should return only routes that are available for cucumber', () => {
          const CUCUMBER_ROUTE: Route = {
            path: '' as RoutePath,
            availability: RouteAvailability.IN_DEVELOPMENT,
            cucumberMode: true
          }
          const NON_CUCUMBER_ROUTE: Route = {
            path: '' as RoutePath,
            availability: RouteAvailability.RELEASED
          }

          mockEnvironment.mockReturnValue(environment)
          mockCucumberMode.mockReturnValue(true)
          mockRoutes.mockReturnValue([CUCUMBER_ROUTE, NON_CUCUMBER_ROUTE])

          const filteredRoutes = getAppRoutes()

          expect(filteredRoutes).toEqual([CUCUMBER_ROUTE])
        })
      }
    )
  })
  describe.each([
    'development',
    'test',
    'temploy',
    'staging'
  ] as EnvironmentTypes[])(
    'when in `%s` and cucumber mode is false',
    environment => {
      it('should return all routes', () => {
        const RELEASED_ROUTE: Route = {
          path: '' as RoutePath,
          availability: RouteAvailability.RELEASED
        }
        const DEVELOPMENT_ROUTE: Route = {
          path: '' as RoutePath,
          availability: RouteAvailability.IN_DEVELOPMENT
        }
        const BETA_ROUTE: Route = {
          path: '' as RoutePath,
          availability: RouteAvailability.BETA,
          experimentsKey: '' as RouteExperimentKey
        }
        const ROUTES = [RELEASED_ROUTE, DEVELOPMENT_ROUTE, BETA_ROUTE]

        mockCucumberMode.mockReturnValue(false)
        mockEnvironment.mockReturnValue(environment)
        mockRoutes.mockReturnValue(ROUTES)

        const filteredRoutes = getAppRoutes()

        expect(filteredRoutes).toBe(ROUTES)
      })
    }
  )
})
