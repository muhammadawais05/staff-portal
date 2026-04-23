import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { CLIENT_AUTOCOMPLETE_EDGE_FRAGMENT } from '../client-autocomplete-edge-fragment'
import {
  GetClientAutocompleteDocument,
  GetClientAutocompleteQueryVariables
} from './get-client-autocomplete.staff.gql.types'

export default gql`
  query GetClientAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
    $model: AutocompleteModels!
    $excludedIds: [ID!]
  ) {
    autocomplete(
      filter: { term: $term, model: $model, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...ClientAutocompleteEdgeFragment
      }
    }
  }

  ${CLIENT_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetClientAutocomplete = (
  model = AutocompleteModels.COMPANIES
) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetClientAutocompleteDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getClients = ({
    term,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: { term: string } & Partial<GetClientAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit, model } })

  return {
    getClients,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}

export const getClientsAutocomplete = async (
  term: string,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetClientAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0,
      model: AutocompleteModels.COMPANIES
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}
