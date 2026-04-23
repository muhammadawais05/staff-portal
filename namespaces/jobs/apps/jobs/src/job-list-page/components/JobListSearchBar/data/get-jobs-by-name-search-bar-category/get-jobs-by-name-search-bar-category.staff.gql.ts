import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetJobsByNameAutocompleteDocument,
  GetJobsByNameAutocompleteQuery,
  GetJobsByNameAutocompleteQueryVariables
} from './get-jobs-by-name-search-bar-category.staff.gql.types'

export const GET_JOBS_BY_NAME_AUTOCOMPLETE: typeof GetJobsByNameAutocompleteDocument = gql`
  query GetJobsByNameAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: {
        term: $term
        model: JOB_SEARCH_NAMES
        excludedIds: $excludedIds
      }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...JobNameEdgeFragment
      }
    }
  }

  fragment JobNameEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetJobsByNameAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getJobsByNameAutocomplete, { data, ...options }] = useLazyQuery(
    GET_JOBS_BY_NAME_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getJobsByName = (term = '', excludedIds?: string[]) =>
    getJobsByNameAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getJobsByName,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getJobsByNameAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetJobsByNameAutocompleteQuery,
    GetJobsByNameAutocompleteQueryVariables
  >({
    query: GET_JOBS_BY_NAME_AUTOCOMPLETE,
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
