import React, { ReactNode } from 'react'
import { RouteExperimentKey } from '@staff-portal/routes'
import { PageLoader } from '@staff-portal/ui'

import { useGetRouteChecks } from './data'
import RedirectToLegacyPage from '../RedirectToLegacyPage'
import BetaSwitcherButton from '../BetaSwitcherButton'

interface Props {
  routeExperimentsKey: RouteExperimentKey
  children: ReactNode
}

const RouteBetaGuard = ({ routeExperimentsKey, children }: Props) => {
  const {
    loading,
    routeReleased,
    routeEnabledForAllParticipants,
    routeEnabledForEarlyAdopters,
    userIsBetaEnabled,
    userIsEarlyAdopter
  } = useGetRouteChecks(routeExperimentsKey)

  if (loading) {
    return <PageLoader />
  }

  if (routeReleased) {
    return <>{children}</>
  }

  const isRouteBetaEnabledForAll =
    userIsBetaEnabled && routeEnabledForAllParticipants
  const isRouteBetaEnabledForEarlyAdopters =
    userIsBetaEnabled && userIsEarlyAdopter && routeEnabledForEarlyAdopters

  if (isRouteBetaEnabledForAll || isRouteBetaEnabledForEarlyAdopters) {
    return (
      <>
        {children}
        <BetaSwitcherButton />
      </>
    )
  }

  return <RedirectToLegacyPage />
}

export default RouteBetaGuard
