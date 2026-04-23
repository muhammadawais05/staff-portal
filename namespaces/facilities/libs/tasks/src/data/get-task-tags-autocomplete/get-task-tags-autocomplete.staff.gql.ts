import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetTaskTagsAutocompleteDocument,
  GetTaskTagsAutocompleteQuery,
  GetTaskTagsAutocompleteQueryVariables
} from './get-task-tags-autocomplete.staff.gql.types'
import { TASK_TAG_FRAGMENT } from '../task-tag-fragment'

export const GET_TASK_TAGS_AUTOCOMPLETE: typeof GetTaskTagsAutocompleteDocument = gql`
  query GetTaskTagsAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: TASK_TAGS, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TaskTagEdgeFragment
      }
    }
  }

  fragment TaskTagEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...TaskTagFragment
    }
  }

  ${TASK_TAG_FRAGMENT}
`

export const useGetTaskTagsAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getTaskTagsAutocomplete, { data, ...options }] = useLazyQuery(
    GET_TASK_TAGS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getTaskTags = (term = '', excludedIds?: string[]) =>
    getTaskTagsAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getTaskTags,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getTaskTagsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetTaskTagsAutocompleteQuery,
    GetTaskTagsAutocompleteQueryVariables
  >({
    query: GET_TASK_TAGS_AUTOCOMPLETE,
    variables: {
      term,
      limit,
      offset: 0
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
