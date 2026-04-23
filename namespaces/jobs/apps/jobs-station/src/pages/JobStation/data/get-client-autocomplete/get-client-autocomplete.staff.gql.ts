import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetClientAutocompleteDocument } from './get-client-autocomplete.staff.gql.types'

export default gql`
  query GetClientAutocomplete($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
      }
    }
  }
`

export const useGetClientAutocomplete = ({
  clientId,
  skip
}: {
  clientId: string
  skip?: boolean
}) => {
  const { data, ...restOptions } = useQuery(GetClientAutocompleteDocument, {
    variables: { clientId },
    fetchPolicy: 'cache-first',
    skip
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
