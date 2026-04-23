import React from 'react'
import { RouteExperimentKey } from '@staff-portal/routes'
import { render } from '@testing-library/react'

import { useGetRouteChecks } from './data'
import RouteBetaGuard from './RouteBetaGuard'

const CONTENT_TEST_ID = 'page-content'
const PAGE_LOADER_ID = 'page-loader'
const BETA_SWITCH_TEST_ID = 'beta-switcher-button'
const REDIRECT_TO_LEGACY_TEST_ID = 'redirect-to-legacy-page'

jest.mock('./data', () => ({
  useGetRouteChecks: jest.fn()
}))

jest.mock('@staff-portal/ui', () => ({
  PageLoader: () => <div data-testid={PAGE_LOADER_ID} />
}))

jest.mock('../BetaSwitcherButton', () => ({
  __esModule: true,
  default: () => <div data-testid={BETA_SWITCH_TEST_ID} />
}))

jest.mock('../RedirectToLegacyPage', () => ({
  __esModule: true,
  default: () => <div data-testid={REDIRECT_TO_LEGACY_TEST_ID} />
}))

const useGetRouteChecksMock = useGetRouteChecks as jest.Mock<
  ReturnType<typeof useGetRouteChecks>
>

const arrangeTest = (routeExperimentsKey = '') =>
  render(
    <RouteBetaGuard
      routeExperimentsKey={routeExperimentsKey as RouteExperimentKey}
    >
      <div data-testid={CONTENT_TEST_ID} />
    </RouteBetaGuard>
  )

describe('RouteBetaGuard', () => {
  describe('when loading', () => {
    it('should fetch required data and render PageLoader while loading', () => {
      const EXPERIMENTS_KEY = 'experiments_key'

      useGetRouteChecksMock.mockReturnValue({
        loading: true,
        routeReleased: false,
        routeEnabledForAllParticipants: false,
        routeEnabledForEarlyAdopters: false,
        userIsBetaEnabled: false,
        userIsEarlyAdopter: false
      })

      const { getByTestId, queryByTestId } = arrangeTest(EXPERIMENTS_KEY)

      expect(useGetRouteChecksMock).toHaveBeenCalledWith(EXPERIMENTS_KEY)
      expect(getByTestId(PAGE_LOADER_ID)).toBeInTheDocument()
      expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
      expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
      expect(queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)).not.toBeInTheDocument()
    })
  })

  describe('when experiment is released', () => {
    it('should render content without beta button', () => {
      useGetRouteChecksMock.mockReturnValue({
        loading: false,
        routeReleased: true,
        routeEnabledForAllParticipants: false,
        routeEnabledForEarlyAdopters: false,
        userIsBetaEnabled: false,
        userIsEarlyAdopter: false
      })

      const { getByTestId, queryByTestId } = arrangeTest()

      expect(getByTestId(CONTENT_TEST_ID)).toBeInTheDocument()
      expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
      expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
      expect(queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)).not.toBeInTheDocument()
    })
  })

  describe('when experiment is enabled for everybody', () => {
    describe('when user is beta enabled', () => {
      it('should render content and beta switch button', () => {
        useGetRouteChecksMock.mockReturnValue({
          loading: false,
          routeReleased: false,
          routeEnabledForAllParticipants: true,
          routeEnabledForEarlyAdopters: false,
          userIsBetaEnabled: true,
          userIsEarlyAdopter: false
        })

        const { getByTestId, queryByTestId } = arrangeTest()

        expect(getByTestId(CONTENT_TEST_ID)).toBeInTheDocument()
        expect(getByTestId(BETA_SWITCH_TEST_ID)).toBeInTheDocument()
        expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
        expect(
          queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)
        ).not.toBeInTheDocument()
      })
    })

    describe('when user is not beta enabled', () => {
      it('should redirect to legacy', () => {
        useGetRouteChecksMock.mockReturnValue({
          loading: false,
          routeReleased: false,
          routeEnabledForAllParticipants: true,
          routeEnabledForEarlyAdopters: false,
          userIsBetaEnabled: false,
          userIsEarlyAdopter: false
        })

        const { getByTestId, queryByTestId } = arrangeTest()

        expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
        expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
      })
    })
  })

  describe('when experiment is enabled for early adopters', () => {
    describe('when user is beta enabled', () => {
      describe('when user is early adopter', () => {
        it('should render content and beta switch button if user is beta enabled, early adopter and the experiment is enabled for early adopters only', () => {
          useGetRouteChecksMock.mockReturnValue({
            loading: false,
            routeReleased: false,
            routeEnabledForAllParticipants: false,
            routeEnabledForEarlyAdopters: true,
            userIsBetaEnabled: true,
            userIsEarlyAdopter: true
          })

          const { getByTestId, queryByTestId } = arrangeTest()

          expect(getByTestId(CONTENT_TEST_ID)).toBeInTheDocument()
          expect(getByTestId(BETA_SWITCH_TEST_ID)).toBeInTheDocument()
          expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
          expect(
            queryByTestId(REDIRECT_TO_LEGACY_TEST_ID)
          ).not.toBeInTheDocument()
        })
      })

      describe('when user is not early adopter', () => {
        it('should redirect to legacy', () => {
          useGetRouteChecksMock.mockReturnValue({
            loading: false,
            routeReleased: false,
            routeEnabledForAllParticipants: false,
            routeEnabledForEarlyAdopters: true,
            userIsBetaEnabled: true,
            userIsEarlyAdopter: false
          })

          const { getByTestId, queryByTestId } = arrangeTest()

          expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
          expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
          expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
          expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
        })
      })
    })

    describe('when user is not beta enabled', () => {
      describe('when user is early adopter', () => {
        it('should redirect to legacy', () => {
          useGetRouteChecksMock.mockReturnValue({
            loading: false,
            routeReleased: false,
            routeEnabledForAllParticipants: false,
            routeEnabledForEarlyAdopters: true,
            userIsBetaEnabled: false,
            userIsEarlyAdopter: true
          })

          const { getByTestId, queryByTestId } = arrangeTest()

          expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
          expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
          expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
          expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
        })
      })

      describe('when user is not early adopter', () => {
        it('should redirect to legacy', () => {
          useGetRouteChecksMock.mockReturnValue({
            loading: false,
            routeReleased: false,
            routeEnabledForAllParticipants: false,
            routeEnabledForEarlyAdopters: true,
            userIsBetaEnabled: false,
            userIsEarlyAdopter: false
          })

          const { getByTestId, queryByTestId } = arrangeTest()

          expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
          expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
          expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
          expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('when all experiments are disabled', () => {
    describe('when user is beta enabled', () => {
      it('should redirect to legacy', () => {
        useGetRouteChecksMock.mockReturnValue({
          loading: false,
          routeReleased: false,
          routeEnabledForAllParticipants: false,
          routeEnabledForEarlyAdopters: false,
          userIsBetaEnabled: true,
          userIsEarlyAdopter: false
        })

        const { getByTestId, queryByTestId } = arrangeTest()

        expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
        expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
      })
    })

    describe('when user is not beta enabled', () => {
      it('should redirect to legacy', () => {
        useGetRouteChecksMock.mockReturnValue({
          loading: false,
          routeReleased: false,
          routeEnabledForAllParticipants: false,
          routeEnabledForEarlyAdopters: false,
          userIsBetaEnabled: false,
          userIsEarlyAdopter: false
        })

        const { getByTestId, queryByTestId } = arrangeTest()

        expect(getByTestId(REDIRECT_TO_LEGACY_TEST_ID)).toBeInTheDocument()
        expect(queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(BETA_SWITCH_TEST_ID)).not.toBeInTheDocument()
        expect(queryByTestId(PAGE_LOADER_ID)).not.toBeInTheDocument()
      })
    })
  })
})
