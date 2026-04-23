import { gql, useQuery, WatchQueryFetchPolicy } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetEngagementBreaksDocument } from './get-engagement-breaks.staff.gql.types'

export const GET_ENGAGEMENT_BREAKS: typeof GetEngagementBreaksDocument = gql`
  query GetEngagementBreaks($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        status
        job {
          id
          status
        }
        operations {
          scheduleEngagementBreak {
            ...OperationFragment
          }
        }
        engagementBreaks(
          order: { field: START_DATE, direction: ASC }
          filter: { statuses: [SCHEDULED] }
        ) {
          nodes {
            ...EngagementBreakFragment
          }
        }
      }
    }
  }

  fragment EngagementBreakFragment on EngagementBreak {
    id
    status
    startDate
    endDate
    messageToClient
    operations {
      rescheduleEngagementBreak {
        ...OperationFragment
      }
      removeEngagementBreak {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetEngagementBreaks = (
  engagementId: string,
  fetchPolicy?: WatchQueryFetchPolicy
) => {
  const { data, loading, ...rest } = useQuery(GET_ENGAGEMENT_BREAKS, {
    variables: { engagementId },
    throwOnError: true,
    fetchPolicy
  })

  return {
    data: data?.node,
    loading,
    ...rest
  }
}
