import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetCommunityEventHostsDocument } from './get-community-event-hosts.staff.gql.types'

// This query is intended to be used to fill up select data
export default gql`
  query GetCommunityEventHosts {
    communityEventHosts {
      nodes {
        id
        fullName
      }
    }
  }
`

export const useGetCommunityEventHosts = () => {
  const { data, loading } = useQuery(GetCommunityEventHostsDocument, {
    throwOnError: true,
    fetchPolicy: 'cache-first'
  })

  return {
    loading,
    eventHosts: data?.communityEventHosts?.nodes
  }
}
