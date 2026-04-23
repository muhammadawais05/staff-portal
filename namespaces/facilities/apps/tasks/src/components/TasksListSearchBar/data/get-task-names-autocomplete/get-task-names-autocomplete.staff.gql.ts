import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetTaskNamesAutocompleteDocument,
  GetTaskNamesAutocompleteQuery,
  GetTaskNamesAutocompleteQueryVariables
} from './get-task-names-autocomplete.staff.gql.types'

export const GET_TASK_NAMES_AUTOCOMPLETE: typeof GetTaskNamesAutocompleteDocument = gql`
  query GetTaskNamesAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: {
        term: $term
        model: TASK_SEARCH_NAMES
        excludedIds: $excludedIds
      }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TaskNameEdgeFragment
      }
    }
  }

  fragment TaskNameEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetTaskNamesAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getTaskNamesAutocomplete, { data, ...options }] = useLazyQuery(
    GET_TASK_NAMES_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getTaskNames = (term = '', excludedIds?: string[]) =>
    getTaskNamesAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getTaskNames,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getTaskNamesAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetTaskNamesAutocompleteQuery,
    GetTaskNamesAutocompleteQueryVariables
  >({
    query: GET_TASK_NAMES_AUTOCOMPLETE,
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
