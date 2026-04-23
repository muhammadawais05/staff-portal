import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { ApolloClient, gql } from '@staff-portal/data-layer-service'

export const GET_SOURCING_REQUESTS_BY_KEYWORDS_AUTOCOMPLETE = gql`
  query GetSourcingRequestsByKeywordsAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: {
        term: $term
        model: JOB_SEARCH_KEYWORDS
        excludedIds: $excludedIds
      }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...SourcingRequestsKeywordFragment
      }
    }
  }

  fragment SourcingRequestsKeywordFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    entityType
    node {
      id
    }
    nodeTypes
  }
`

export const getSourcingRequestsByKeywordsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GET_SOURCING_REQUESTS_BY_KEYWORDS_AUTOCOMPLETE,
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
