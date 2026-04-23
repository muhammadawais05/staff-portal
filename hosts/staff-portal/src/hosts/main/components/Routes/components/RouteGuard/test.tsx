import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import {
  Route,
  RouteAvailability,
  RouteExperimentKey,
  RoutePath
} from '@staff-portal/routes'

import { useRouteRedirectDisabledByUser } from './hooks'
import { shouldSkipRouteRedirect } from './utils'
import RouteGuard from './RouteGuard'
import RouteBetaGuard from '../RouteBetaGuard'

const CONTENT_TEST_ID = 'page-content'
const BETA_SWITCH_TEST_ID = 'beta-switcher-button'
const REDIRECT_TO_LEGACY_TEST_ID = 'redirect-to-legacy-page'
const ROUTE_BETA_GUARD_TEST_ID = 'route-beta-guard'

const IN_DEVELOPMENT_ROUTE: Route = {
  path: '' as RoutePath,
  availability: RouteAvailability.IN_DEVELOPMENT
}
const BETA_ROUTE: Route = {
  path: '' as RoutePath,
  availability: RouteAvailability.BETA,
  experimentsKey: '' as RouteExperimentKey
}
const RELEASED_ROUTE: Route = {
  path: '' as RoutePath,
  availability: RouteAvailability.RELEASED
}

jest.mock('./hooks', () => ({
  useRouteRedirectDisabledByUser: jest.fn()
}))

jest.mock('./utils', () => ({
  shouldSkipRouteRedirect: jest.fn()
}))

jest.mock('../RouteBetaGuard', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../BetaSwitcherButton', () => ({
  __esModule: true,
  default: () => <div data-testid={BETA_SWITCH_TEST_ID} />
}))

jest.mock('../RedirectToLegacyPage', () => ({
  __esModule: true,
  default: () => <div data-testid={REDIRECT_TO_LEGACY_TEST_ID} />
}))

const useRouteRedirectDisabledByUserMock =
  useRouteRedirectDisabledByUser as jest.Mock<
    ReturnType<typeof useRouteRedirectDisabledByUser>
  >
const routeBetaGuardMock = RouteBetaGuard as jest.Mock<
  ReturnType<typeof RouteBetaGuard>
>

const shouldSkipRouteRedirectMock = shouldSkipRouteRedirect as jest.Mock<
  ReturnType<typeof shouldSkipRouteRedirect>
>

const arrangeTest = (
  routeConfig: Route,
  children: ReactNode = <div data-testid={CONTENT_TEST_ID} />
) => render(<RouteGuard routeConfig={routeConfig}>{children}</RouteGuard>)

describe('RouteGuard', () => {
  beforeEach(() => {
    routeBetaGuardMock.mockReturnValue(<div />)
  })

  describe('when route is `RELEASED`', () => {
    it('should render content without beta switch', () => {
      const { getByTestId, queryByTestId } = arrangeTest(RELEASED_ROUTE)

      expect(getByTestId(CONTENT_TEST_ID)).toBeInTheDocument()
      expect(shouldSkipRouteRedirectMock).not.toHaveBeenCalled()
      expect(routeBetaGuardMock).not.toHaveBeenCalled()
      expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
      expect(queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)).not.toBeInTheDocument()
    })
  })

  describe('when route is `BETA`', () => {
    describe('when redirects are skipped', () => {
      it('should render content with beta switch', () => {
        useRouteRedirectDisabledByUserMock.mockReturnValue(true)
        shouldSkipRouteRedirectMock.mockReturnValue(true)

        const { getByTestId, queryByTestId } = arrangeTest(BETA_ROUTE)

        expect(shouldSkipRouteRedirectMock).toHaveBeenCalledWith(
          BETA_ROUTE.availability,
          true
        )
        expect(getByTestId(CONTENT_TEST_ID)).toBeInTheDocument()
        expect(getByTestId(BETA_SWITCH_TEST_ID)).toBeInTheDocument()
        expect(routeBetaGuardMock).not.toHaveBeenCalled()
        expect(
          queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)
        ).not.toBeInTheDocument()
      })
    })

    describe('when redirects are not skipped', () => {
      it('should render beta guard', () => {
        const EXPERIMENTS_KEY = 'test_experiment'
        const children = <div />

        useRouteRedirectDisabledByUserMock.mockReturnValue(false)
        shouldSkipRouteRedirectMock.mockReturnValue(false)

        routeBetaGuardMock.mockReturnValue(
          <div data-testid={ROUTE_BETA_GUARD_TEST_ID} />
        )
        const { getByTestId, queryByTestId } = arrangeTest(
          {
            ...BETA_ROUTE,
            experimentsKey: EXPERIMENTS_KEY as RouteExperimentKey
          },
          children
        )

        expect(shouldSkipRouteRedirectMock).toHaveBeenCalledWith(
          BETA_ROUTE.availability,
          false
        )
        expect(routeBetaGuardMock).toHaveBeenCalledWith(
          { children, routeExperimentsKey: EXPERIMENTS_KEY },
          expect.anything()
        )
        expect(getByTestId(ROUTE_BETA_GUARD_TEST_ID)).toBeInTheDocument()
        expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
        expect(
          queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when route is `IN_DEVELOPMENT`', () => {
    describe('when redirects are skipped', () => {
      it('should render content with beta switch', () => {
        useRouteRedirectDisabledByUserMock.mockReturnValue(true)
        shouldSkipRouteRedirectMock.mockReturnValue(true)

        const { getByTestId, queryByTestId } = arrangeTest(IN_DEVELOPMENT_ROUTE)

        expect(shouldSkipRouteRedirectMock).toHaveBeenCalledWith(
          IN_DEVELOPMENT_ROUTE.availability,
          true
        )
        expect(getByTestId(CONTENT_TEST_ID)).toBeInTheDocument()
        expect(getByTestId(BETA_SWITCH_TEST_ID)).toBeInTheDocument()
        expect(routeBetaGuardMock).not.toHaveBeenCalled()
        expect(
          queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)
        ).not.toBeInTheDocument()
      })
    })

    describe('when redirects are not skipped', () => {
      it('should render redirect to legacy', () => {
        useRouteRedirectDisabledByUserMock.mockReturnValue(false)
        shouldSkipRouteRedirectMock.mockReturnValue(false)

        const { getByTestId, queryByTestId } = arrangeTest(IN_DEVELOPMENT_ROUTE)

        expect(shouldSkipRouteRedirectMock).toHaveBeenCalledWith(
          IN_DEVELOPMENT_ROUTE.availability,
          false
        )
        expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
        expect(routeBetaGuardMock).not.toHaveBeenCalled()
        expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
      })
    })
  })
})
