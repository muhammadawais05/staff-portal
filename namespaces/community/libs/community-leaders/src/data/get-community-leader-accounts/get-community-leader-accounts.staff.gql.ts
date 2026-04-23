import { gql, useQuery } from '@staff-portal/data-layer-service'

import { COMMUNITY_LEADER_APPLICATION_FRAGMENT } from '../fragments/community-leader-application-fragment.staff.gql'
import { COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT } from '../fragments/community-leader-edge-operations-fragment.staff.gql'
import { COMMUNITY_LEADER_NODE_FRAGMENT } from '../fragments/community-leader-node-fragment.staff.gql'
import { COMMUNITY_LEADER_ROLE_FRAGMENT } from '../fragments/community-leader-role-fragment.staff.gql'
import {
  CommunityLeadersAccountsDocument,
  CommunityLeadersAccountsQueryVariables
} from './get-community-leader-accounts.staff.gql.types'

export const GET_COMMUNITY_LEADERS = gql`
  query CommunityLeadersAccounts(
    $filter: CommunityLeaderAccountFilter!
    $pagination: OffsetPagination!
  ) {
    communityLeaderAccounts(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        id
        status
        type
        application {
          ...CommunityLeaderApplicationFragment
        }
        node {
          ...CommunityLeaderNodeFragment
        }
        ...CommunityLeaderRole
        ...CommunityLeaderEdgeOperationsFragment
      }
    }
  }

  ${COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT}
  ${COMMUNITY_LEADER_NODE_FRAGMENT}
  ${COMMUNITY_LEADER_APPLICATION_FRAGMENT}
  ${COMMUNITY_LEADER_ROLE_FRAGMENT}
`

export const useGetCommunityLeadersAccount = ({
  filter,
  pagination
}: CommunityLeadersAccountsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(
    CommunityLeadersAccountsDocument,
    {
      variables: {
        filter,
        pagination
      }
    }
  )

  return {
    data: data?.communityLeaderAccounts?.nodes,
    totalCount: data?.communityLeaderAccounts?.totalCount,
    loading,
    error,
    refetch
  }
}
