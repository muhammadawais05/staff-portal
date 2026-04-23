import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetEngagementTalentExtraHoursEnabledDocument } from './get-engagement-extra-hours-enabled.staff.gql.types'

export default gql`
  query GetEngagementTalentExtraHoursEnabled($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        extraHoursEnabled
      }
    }
  }
`

export const getLazyEngagementExtraHoursHook = (engagementId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetEngagementTalentExtraHoursEnabledDocument,
    {
      variables: { engagementId }
    }
  )

  return {
    request,
    data: String(!!data?.node?.extraHoursEnabled),
    error,
    loading
  }
}
