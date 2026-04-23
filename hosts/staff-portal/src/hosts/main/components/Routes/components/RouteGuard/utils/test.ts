import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'
import { RouteAvailability } from '@staff-portal/routes'

import { shouldSkipRouteRedirect } from './should-skip-route-redirect'

const mockEnvironment = jest.fn<EnvironmentTypes, []>()
const mockCucumberMode = jest.fn<boolean, []>()

jest.mock('@staff-portal/config', () => ({
  get ENVIRONMENT() {
    return mockEnvironment()
  },
  get CUCUMBER_MODE() {
    return mockCucumberMode()
  }
}))

describe('shouldSkipRouteRedirect', () => {
  beforeEach(() => {
    mockCucumberMode.mockReturnValue(false)
  })

  it.each([RouteAvailability.IN_DEVELOPMENT, RouteAvailability.BETA])(
    'should return true for %s route if user has disabled redirects in non production environments',
    routeAvailability => {
      mockEnvironment.mockReturnValue('staging')

      expect(shouldSkipRouteRedirect(routeAvailability, true)).toBe(true)
    }
  )

  it.each(['development', 'temploy'] as EnvironmentTypes[])(
    'should return true for `IN_DEVELOPMENT` route in %s environment',
    environment => {
      mockEnvironment.mockReturnValue(environment)

      expect(
        shouldSkipRouteRedirect(RouteAvailability.IN_DEVELOPMENT, false)
      ).toBe(true)
    }
  )

  it.each([RouteAvailability.IN_DEVELOPMENT, RouteAvailability.BETA])(
    'should return true for %s route in cucumber mode',
    routeAvailability => {
      mockEnvironment.mockReturnValue('production')
      mockCucumberMode.mockReturnValue(true)

      expect(shouldSkipRouteRedirect(routeAvailability, false)).toBe(true)
    }
  )

  it.each([RouteAvailability.IN_DEVELOPMENT, RouteAvailability.BETA])(
    'should return true for %s route in test environment',
    routeAvailability => {
      mockEnvironment.mockReturnValue('test')

      expect(shouldSkipRouteRedirect(routeAvailability, false)).toBe(true)
    }
  )

  it.each([RouteAvailability.IN_DEVELOPMENT, RouteAvailability.BETA])(
    'should return false for %s route if user has disabled redirects in production environment',
    routeAvailability => {
      mockEnvironment.mockReturnValue('production')

      expect(shouldSkipRouteRedirect(routeAvailability, true)).toBe(false)
    }
  )

  it.each(['production', 'staging'] as EnvironmentTypes[])(
    'should return false for `IN_DEVELOPMENT` route in %s environment',
    environment => {
      mockEnvironment.mockReturnValue(environment)

      expect(
        shouldSkipRouteRedirect(RouteAvailability.IN_DEVELOPMENT, false)
      ).toBe(false)
    }
  )

  it.each([
    'production',
    'staging',
    'development',
    'temploy'
  ] as EnvironmentTypes[])(
    'should return false for `BETA` route in %s environment',
    environment => {
      mockEnvironment.mockReturnValue(environment)

      expect(shouldSkipRouteRedirect(RouteAvailability.BETA, false)).toBe(false)
    }
  )
})
