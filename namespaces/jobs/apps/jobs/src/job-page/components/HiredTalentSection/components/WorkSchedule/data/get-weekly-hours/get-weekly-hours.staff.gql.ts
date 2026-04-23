import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetEngagementWeeklyHoursDocument } from './get-weekly-hours.staff.gql.types'

export default gql`
  query GetEngagementWeeklyHours($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        weeklyHours
        operations {
          updateEngagementWeeklyHours {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`

export const getLazyWeeklyHoursHook = (engagementId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetEngagementWeeklyHoursDocument,
    {
      variables: { engagementId }
    }
  )

  return {
    request,
    data: String(data?.node?.weeklyHours),
    error,
    loading
  }
}
