import { gql, useQuery } from '@staff-portal/data-layer-service'

import { COMMUNITY_LEADER_APPLICATION_FRAGMENT } from '../fragments/community-leader-application-fragment.staff.gql'
import { COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT } from '../fragments/community-leader-edge-operations-fragment.staff.gql'
import { COMMUNITY_LEADER_NODE_FRAGMENT } from '../fragments/community-leader-node-fragment.staff.gql'
import { COMMUNITY_LEADER_ROLE_FRAGMENT } from '../fragments/community-leader-role-fragment.staff.gql'
import {
  CommunityLeadersDocument,
  CommunityLeadersQueryVariables
} from './get-community-leaders.staff.gql.types'

export const GET_COMMUNITY_LEADERS = gql`
  query CommunityLeaders(
    $filter: String
    $limit: Int!
    $offset: Int!
    $status: CommunityLeaderRecordStatus
  ) {
    communityLeaders(
      filter: { keywords: $filter, status: $status }
      pagination: { offset: $offset, limit: $limit }
    ) {
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

export const useGetCommunityLeaders = ({
  filter,
  limit,
  offset,
  status
}: CommunityLeadersQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(CommunityLeadersDocument, {
    variables: {
      filter,
      limit,
      offset,
      status
    }
  })

  return {
    data: data?.communityLeaders?.nodes,
    totalCount: data?.communityLeaders?.totalCount,
    loading,
    error,
    refetch
  }
}
