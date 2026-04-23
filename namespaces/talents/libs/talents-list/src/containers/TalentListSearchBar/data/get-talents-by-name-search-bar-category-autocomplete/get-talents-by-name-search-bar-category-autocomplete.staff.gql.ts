import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetTalentsByNameAutocompleteDocument,
  GetTalentsByNameAutocompleteQuery,
  GetTalentsByNameAutocompleteQueryVariables
} from './get-talents-by-name-search-bar-category-autocomplete.staff.gql.types'

export default gql`
  query GetTalentsByNameAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: TALENTS, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TalentNameEdgeFragment
      }
    }
  }

  fragment TalentNameEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetTalentsByNameAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getTalentsByNameAutocomplete, { data, ...options }] = useLazyQuery(
    GetTalentsByNameAutocompleteDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getTalentsByName = (term = '', excludedIds?: string[]) =>
    getTalentsByNameAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getTalentsByName,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getTalentsByNameAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetTalentsByNameAutocompleteQuery,
    GetTalentsByNameAutocompleteQueryVariables
  >({
    query: GetTalentsByNameAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}
