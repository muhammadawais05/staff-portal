import { gql, useQuery, ApolloError } from '@staff-portal/data-layer-service'

import { GetTopscreenClientsDocument } from './get-topscreen-clients.staff.gql.types'

export default gql`
  query GetTopscreenClients {
    topscreenClients {
      nodes {
        ...TopscreenClientFragment
      }
    }
  }

  fragment TopscreenClientFragment on TopscreenClient {
    name
    id
  }
`
export const useGetTopscreenClients = ({
  onError
}: {
  onError?: (error: ApolloError) => void
} = {}) => {
  const { data, ...restOptions } = useQuery(GetTopscreenClientsDocument, {
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    topscreenClients: data?.topscreenClients?.nodes,
    ...restOptions
  }
}
