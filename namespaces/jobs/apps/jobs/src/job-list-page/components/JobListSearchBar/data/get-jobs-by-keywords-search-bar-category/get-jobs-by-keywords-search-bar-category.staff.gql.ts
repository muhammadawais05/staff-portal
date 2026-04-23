import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetJobsByKeywordsAutocompleteQuery,
  GetJobsByKeywordsAutocompleteQueryVariables,
  GetJobsByKeywordsAutocompleteDocument
} from './get-jobs-by-keywords-search-bar-category.staff.gql.types'

export const GET_JOBS_BY_KEYWORDS_AUTOCOMPLETE: typeof GetJobsByKeywordsAutocompleteDocument = gql`
  query GetJobsByKeywordsAutocomplete(
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
        ...JobKeywordFragment
      }
    }
  }

  fragment JobKeywordFragment on AutocompleteEdge {
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

export const useGetJobByKeywordsAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getJobsByKeywordsAutocomplete, { data, ...options }] = useLazyQuery(
    GET_JOBS_BY_KEYWORDS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getJobsByKeywords = (term = '', excludedIds?: string[]) =>
    getJobsByKeywordsAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getJobsByKeywords,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getJobsByKeywordsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetJobsByKeywordsAutocompleteQuery,
    GetJobsByKeywordsAutocompleteQueryVariables
  >({
    query: GET_JOBS_BY_KEYWORDS_AUTOCOMPLETE,
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
