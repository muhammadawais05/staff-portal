import { gql, useQuery } from '@staff-portal/data-layer-service'

import { COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT } from '../fragments/community-leader-edge-operations-fragment.staff.gql'
import { COMMUNITY_LEADER_APPLICATION_FRAGMENT } from '../fragments/community-leader-application-fragment.staff.gql'
import { COMMUNITY_LEADER_NODE_WITH_NOTES_FRAGMENT } from '../fragments/community-leader-node-with-notes-fragment.staff.gql'
import { GetCommunityLeaderWithNotesDocument } from './get-community-leader-notes.staff.gql.types'
import { COMMUNITY_LEADER_ROLE_FRAGMENT } from '../fragments/community-leader-role-fragment.staff.gql'

export const GET_STAFF_COMMUNITY_LEADER = gql`
  query GetCommunityLeaderWithNotes($id: ID!) {
    communityLeader(id: $id) {
      id
      status
      application {
        ...CommunityLeaderApplicationFragment
      }
      node {
        ...CommunityLeaderNodeWithNotesFragment
      }
      ...CommunityLeaderRole
      ...CommunityLeaderEdgeOperationsFragment
    }
  }

  ${COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT}
  ${COMMUNITY_LEADER_NODE_WITH_NOTES_FRAGMENT}
  ${COMMUNITY_LEADER_APPLICATION_FRAGMENT}
  ${COMMUNITY_LEADER_ROLE_FRAGMENT}
`

export const useGetCommunityLeaderNotes = (id: string) => {
  const { data, loading, error, refetch } = useQuery(
    GetCommunityLeaderWithNotesDocument,
    {
      variables: {
        id
      }
    }
  )

  return {
    data: data?.communityLeader?.node,
    loading,
    error,
    refetch
  }
}
