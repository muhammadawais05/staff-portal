import React, { ReactNode } from 'react'
import { Route as RouteConfig, RouteAvailability } from '@staff-portal/routes'

import RouteBetaGuard from '../RouteBetaGuard'
import RedirectToLegacyPage from '../RedirectToLegacyPage'
import { useRouteRedirectDisabledByUser } from './hooks'
import BetaSwitcherButton from '../BetaSwitcherButton'
import { shouldSkipRouteRedirect } from './utils'

interface Props {
  routeConfig: RouteConfig
  children: ReactNode
}

const RouteGuard = ({ routeConfig, children }: Props) => {
  const isRedirectDisabled = useRouteRedirectDisabledByUser()

  // 'RELEASED' route is always skipping the redirect
  if (routeConfig.availability === RouteAvailability.RELEASED) {
    return <>{children}</>
  }

  // route that is meeting some criteria is skipping the redirect
  if (shouldSkipRouteRedirect(routeConfig.availability, isRedirectDisabled)) {
    return (
      <>
        {children}
        <BetaSwitcherButton />
      </>
    )
  }

  // 'BETA' route checks the chameleon experiments
  if (routeConfig.availability === RouteAvailability.BETA) {
    return (
      <RouteBetaGuard routeExperimentsKey={routeConfig.experimentsKey}>
        {children}
      </RouteBetaGuard>
    )
  }

  // redirect to legacy
  return <RedirectToLegacyPage />
}

export default RouteGuard
