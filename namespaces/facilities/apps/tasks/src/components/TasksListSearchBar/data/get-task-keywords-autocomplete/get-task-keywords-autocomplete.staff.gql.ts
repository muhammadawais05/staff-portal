import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetTaskKeywordsAutocompleteDocument,
  GetTaskKeywordsAutocompleteQuery,
  GetTaskKeywordsAutocompleteQueryVariables
} from './get-task-keywords-autocomplete.staff.gql.types'

export const GET_TASK_KEYWORDS_AUTOCOMPLETE: typeof GetTaskKeywordsAutocompleteDocument = gql`
  query GetTaskKeywordsAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: {
        term: $term
        model: TASK_SEARCH_KEYWORDS
        excludedIds: $excludedIds
      }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TaskKeywordEdgeFragment
      }
    }
  }

  fragment TaskKeywordEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetTaskKeywordsAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getTaskKeywordsAutocomplete, { data, ...options }] = useLazyQuery(
    GET_TASK_KEYWORDS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getTaskKeywords = (term = '', excludedIds?: string[]) =>
    getTaskKeywordsAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getTaskKeywords,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getTaskKeywordsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetTaskKeywordsAutocompleteQuery,
    GetTaskKeywordsAutocompleteQueryVariables
  >({
    query: GET_TASK_KEYWORDS_AUTOCOMPLETE,
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
