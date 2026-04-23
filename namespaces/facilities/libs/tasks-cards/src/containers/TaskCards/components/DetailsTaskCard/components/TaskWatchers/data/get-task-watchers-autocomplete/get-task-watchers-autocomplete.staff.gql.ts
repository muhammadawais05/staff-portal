import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

import {
  GetTaskWatchersAutocompleteDocument,
  GetTaskWatchersAutocompleteQueryVariables
} from './get-task-watchers-autocomplete.staff.gql.types'

export const GET_TASK_WATCHERS_AUTOCOMPLETE: typeof GetTaskWatchersAutocompleteDocument = gql`
  query GetTaskWatchersAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: TASK_WATCHERS, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TaskWatcherAutocompleteEdgeFragment
      }
    }
  }

  fragment TaskWatcherAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...RoleOrClientFragment
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
`

export const useGetTaskWatchersAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_TASK_WATCHERS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )
  const getWatchers = ({
    term,
    excludedIds,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: { term: string } & Partial<GetTaskWatchersAutocompleteQueryVariables>) =>
    fetch({ variables: { term, excludedIds, offset, limit } })

  return {
    getWatchers,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
