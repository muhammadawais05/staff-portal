import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetCommunityLeaderApplicationsHistoryDocument,
  GetCommunityLeaderApplicationsHistoryQueryVariables
} from './get-community-leader-applications-history.staff.gql.types'
import { COMMUNITY_LEADER_APPLICATION_FRAGMENT } from '../fragments/community-leader-application-fragment.staff.gql'

export default gql`
  query GetCommunityLeaderApplicationsHistory($id: ID!) {
    communityLeader(id: $id) {
      id
      applicationsHistory {
        ...CommunityLeaderApplicationFragment
      }
    }
  }
  ${COMMUNITY_LEADER_APPLICATION_FRAGMENT}
`

export const useGetCommunityLeaderApplicationsHistory = ({
  id
}: GetCommunityLeaderApplicationsHistoryQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(
    GetCommunityLeaderApplicationsHistoryDocument,
    {
      variables: {
        id
      }
    }
  )

  return {
    data: data?.communityLeader?.applicationsHistory,
    loading,
    error,
    refetch
  }
}
