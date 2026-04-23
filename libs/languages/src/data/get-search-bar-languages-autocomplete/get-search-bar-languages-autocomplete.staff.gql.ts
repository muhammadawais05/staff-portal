import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import { GetSearchBarLanguagesAutocompleteDocument } from './get-search-bar-languages-autocomplete.staff.gql.types'

const DEFAULT_AUTOCOMPLETE_RESULTS_SIZE = 6

export default gql`
  query GetSearchBarLanguagesAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: LANGUAGES, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...LanguagesEdgeFragment
      }
    }
  }

  fragment LanguagesEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetSearchBarLanguagesAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getSearchBarLanguagesAutocomplete, { data, ...options }] =
    useLazyQuery(GetSearchBarLanguagesAutocompleteDocument, {
      fetchPolicy: 'cache-first'
    })

  const getLanguages = (term = '', excludedIds?: string[]) =>
    getSearchBarLanguagesAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getLanguages,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getSearchBarLanguagesAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetSearchBarLanguagesAutocompleteDocument,
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
