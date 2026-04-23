import { gql, useQuery } from '@staff-portal/data-layer-service'

import { COMMUNITY_LEADER_EVENTS } from '../fragments/community-leader-events.staff.gql'
import {
  GetCommunityLeaderEventsDocument,
  GetCommunityLeaderEventsQueryVariables
} from './get-community-leader-events.staff.gql.types'

export default gql`
  query GetCommunityLeaderEvents($id: ID!) {
    communityLeader(id: $id) {
      id
      ...CommunityEvents
    }
  }
  ${COMMUNITY_LEADER_EVENTS}
`

export const useGetCommunityLeaderEvents = ({
  id
}: GetCommunityLeaderEventsQueryVariables) => {
  const { data, loading, error, refetch, initialLoading } = useQuery(
    GetCommunityLeaderEventsDocument,
    {
      variables: {
        id
      }
    }
  )

  return {
    data: data?.communityLeader?.communityEvents?.nodes,
    loading,
    error,
    initialLoading,
    refetch
  }
}
