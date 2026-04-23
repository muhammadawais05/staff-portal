import { BATCH, gql, useGetData } from '@staff-portal/data-layer-service'

import { GetRouteChecksDocument } from './get-route-checks.staff.gql.types'

export const GET_ROUTE_CHECKS = gql`
  query GetRouteChecks(
    $earlyAdoptersExperimentKey: String!
    $allParticipantsExperimentKey: String!
    $releaseExperimentKey: String!
  ) {
    viewer {
      earlyAdopters: userVariantForExperiment(
        experimentKey: $earlyAdoptersExperimentKey
      )
      allParticipants: userVariantForExperiment(
        experimentKey: $allParticipantsExperimentKey
      )
      released: userVariantForExperiment(experimentKey: $releaseExperimentKey)
      me {
        id
        staffPortalBetaEnabled
        staffPortalEarlyAdopter
      }
    }
  }
`

const ENABLED = 'enabled'

export const useGetRouteChecks = (experimentKey: string) => {
  const { data, loading } = useGetData(GetRouteChecksDocument, 'viewer')(
    {
      earlyAdoptersExperimentKey: `${experimentKey}_early_adopters`,
      allParticipantsExperimentKey: `${experimentKey}_all_participants`,
      releaseExperimentKey: `${experimentKey}_release`
    },
    {
      throwOnError: false,
      // needed in order to always get the latest data
      fetchPolicy: 'network-only',
      context: { [BATCH]: false }
    }
  )

  return {
    loading,
    routeEnabledForEarlyAdopters: data?.earlyAdopters === ENABLED,
    routeEnabledForAllParticipants: data?.allParticipants === ENABLED,
    routeReleased: data?.released === ENABLED,
    userIsBetaEnabled: !!data?.me.staffPortalBetaEnabled,
    userIsEarlyAdopter: !!data?.me.staffPortalEarlyAdopter
  }
}
