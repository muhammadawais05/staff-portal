import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetJobKeywordsAutocompleteDocument,
  GetJobKeywordsAutocompleteQuery,
  GetJobKeywordsAutocompleteQueryVariables
} from './get-job-keywords-autocomplete.staff.gql.types'

export default gql`
  query GetJobKeywordsAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: JOBS, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...JobKeywordEdgeFragment
      }
    }
  }

  fragment JobKeywordEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetJobKeywordsAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getJobKeywordsAutocomplete, { data, ...options }] = useLazyQuery(
    GetJobKeywordsAutocompleteDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getJobKeywords = (term = '', excludedIds?: string[]) =>
    getJobKeywordsAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getJobKeywords,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getJobKeywordsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetJobKeywordsAutocompleteQuery,
    GetJobKeywordsAutocompleteQueryVariables
  >({
    query: GetJobKeywordsAutocompleteDocument,
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
