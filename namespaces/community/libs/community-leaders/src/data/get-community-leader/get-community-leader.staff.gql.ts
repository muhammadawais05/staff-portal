import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { COMMUNITY_LEADER_APPLICATION_FRAGMENT } from '../fragments/community-leader-application-fragment.staff.gql'
import { COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT } from '../fragments/community-leader-edge-operations-fragment.staff.gql'
import { COMMUNITY_LEADER_NODE_FRAGMENT } from '../fragments/community-leader-node-fragment.staff.gql'
import { COMMUNITY_LEADER_ROLE_FRAGMENT } from '../fragments/community-leader-role-fragment.staff.gql'
import {
  GetCommunityLeaderDocument,
  GetCommunityLeaderQueryVariables
} from './get-community-leader.staff.gql.types'

export default gql`
  query GetCommunityLeader($id: ID!) {
    communityLeader(id: $id) {
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
    node(id: $id) {
      ... on Staff {
        __typename
        id
        fullName
        operations {
          appointCommunityLeader {
            ...OperationFragment
          }
        }
      }
      ... on Talent {
        __typename
        id
        fullName
        operations {
          appointCommunityLeader {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT}
  ${COMMUNITY_LEADER_NODE_FRAGMENT}
  ${COMMUNITY_LEADER_APPLICATION_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${COMMUNITY_LEADER_ROLE_FRAGMENT}
`

export const useGetCommunityLeader = ({
  id
}: GetCommunityLeaderQueryVariables) => {
  const { data, loading, error, refetch, initialLoading } = useQuery(
    GetCommunityLeaderDocument,
    {
      variables: {
        id
      }
    }
  )

  return {
    data: {
      communityLeader: data?.communityLeader,
      basicLeaderInfo: data?.node
    },
    loading,
    error,
    initialLoading,
    refetch
  }
}
