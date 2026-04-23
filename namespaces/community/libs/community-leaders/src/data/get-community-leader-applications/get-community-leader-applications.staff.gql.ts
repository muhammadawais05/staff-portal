import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  GetCommunityLeaderApplicationsDocument,
  GetCommunityLeaderApplicationsQueryVariables
} from './get-community-leader-applications.staff.gql.types'
import { COMMUNITY_LEADER_APPLICATION_FRAGMENT } from '../fragments/community-leader-application-fragment.staff.gql'
import { COMMUNITY_LEADER_ROLE_FRAGMENT } from '../fragments/community-leader-role-fragment.staff.gql'

export const GET_COMMUNITY_LEADER_APPLICATIONS = gql`
  query GetCommunityLeaderApplications(
    $filter: CommunityLeaderApplicationFilter
    $pagination: OffsetPagination!
  ) {
    communityLeaderApplications(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        id
        status
        ...CommunityLeaderRole
        application {
          ...CommunityLeaderApplicationFragment
        }
        operations {
          approveCommunityLeaderApplication {
            ...OperationFragment
          }
          rejectCommunityLeaderApplication {
            ...OperationFragment
          }
          holdCommunityLeaderApplication {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${COMMUNITY_LEADER_APPLICATION_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${COMMUNITY_LEADER_ROLE_FRAGMENT}
`

export const useGetCommunityLeaderApplications = ({
  pagination,
  filter
}: GetCommunityLeaderApplicationsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(
    GetCommunityLeaderApplicationsDocument,
    {
      variables: {
        pagination,
        filter
      }
    }
  )

  return {
    data: data?.communityLeaderApplications?.nodes,
    totalCount: data?.communityLeaderApplications?.totalCount,
    loading,
    error,
    refetch
  }
}
