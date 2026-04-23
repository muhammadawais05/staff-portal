import { gql, useQuery } from '@staff-portal/data-layer-service'

import { COMMUNITY_LEADER_NODE_FRAGMENT } from '../fragments/community-leader-node-fragment.staff.gql'
import { COMMUNITY_LEADER_ROLE_FRAGMENT } from '../fragments/community-leader-role-fragment.staff.gql'
import { GetFeaturedCommunityLeadersDocument } from './get-featured-community-leaders.staff.gql.types'

export const GET_FEATURED_COMMUNITY_LEADERS = gql`
  query GetFeaturedCommunityLeaders {
    communityFeaturedLeaders {
      id
      node {
        ...CommunityLeaderNodeFragment
      }
      ...CommunityLeaderRole
    }
  }

  ${COMMUNITY_LEADER_NODE_FRAGMENT}
  ${COMMUNITY_LEADER_ROLE_FRAGMENT}
`

export const useGetFeaturedCommunityLeaders = ({
  onError
}: {
  onError: () => void
}) => {
  const { data, loading, error, refetch } = useQuery(
    GetFeaturedCommunityLeadersDocument,
    { onError }
  )

  return {
    data: data?.communityFeaturedLeaders,
    totalCount: data?.communityFeaturedLeaders?.length,
    loading,
    error,
    refetch
  }
}
