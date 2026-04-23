import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetCommunityLeaderTypeDocument,
  GetCommunityLeaderTypeQueryVariables
} from './get-community-leader-type.staff.gql.types'

export default gql`
  query GetCommunityLeaderType($id: ID!) {
    communityLeader(id: $id) {
      id
      type
    }
  }
`

export const useGetCommunityLeaderType = ({
  id
}: GetCommunityLeaderTypeQueryVariables) => {
  const [request, { data, loading, error, called }] = useLazyQuery(
    GetCommunityLeaderTypeDocument,
    {
      variables: {
        id
      }
    }
  )

  return {
    request,
    loading,
    called,
    error,
    data: data?.communityLeader?.type || undefined
  }
}
