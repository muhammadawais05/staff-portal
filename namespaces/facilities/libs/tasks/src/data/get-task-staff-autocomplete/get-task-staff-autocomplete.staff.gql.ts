import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { TASK_STAFF_AUTOCOMPLETE_EDGE_FRAGMENT } from '../task-staff-autocomplete-edge-fragment'
import {
  GetTaskStaffAutocompleteDocument,
  GetTaskStaffAutocompleteQueryVariables
} from './get-task-staff-autocomplete.staff.gql.types'

export const GET_TASK_STAFF_AUTOCOMPLETE: typeof GetTaskStaffAutocompleteDocument = gql`
  query GetTaskStaffAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: TASK_STAFF, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TaskStaffAutocompleteEdgeFragment
      }
    }
  }

  ${TASK_STAFF_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetTaskStaffAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_TASK_STAFF_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getUsers = ({
    term,
    excludedIds,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: { term: string } & Partial<GetTaskStaffAutocompleteQueryVariables>) =>
    fetch({ variables: { term, excludedIds, offset, limit } })

  return {
    getUsers,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
