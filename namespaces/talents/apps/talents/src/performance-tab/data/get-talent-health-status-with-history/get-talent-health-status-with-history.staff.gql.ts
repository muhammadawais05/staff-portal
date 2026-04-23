import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { GetTalentHealthStatusWithHistoryDocument } from './get-talent-health-status-with-history.staff.gql.types'

export const GET_TALENT_HEALTH_STATUS_WITH_HISTORY: typeof GetTalentHealthStatusWithHistoryDocument = gql`
  query GetTalentHealthStatusWithHistory($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        currentHealthStatus {
          healthStatus
        }
        healthStatusHistory {
          nodes {
            ...TalentPerformanceHealthStatusFragment
          }
          totalCount
        }
        operations {
          setHealthStatusTalent {
            ...OperationFragment
          }
        }
      }
    }
  }

  fragment TalentPerformanceHealthStatusFragment on TalentHealthStatus {
    comment
    createdAt
    healthStatus
    performer {
      id
      ...WebResourceFragment
    }
  }

  ${OPERATION_FRAGMENT}

  ${WEB_RESOURCE_FRAGMENT}
`

export const useGetTalentHealthStatusWithHistory = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_TALENT_HEALTH_STATUS_WITH_HISTORY,
    {
      variables: { talentId }
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
