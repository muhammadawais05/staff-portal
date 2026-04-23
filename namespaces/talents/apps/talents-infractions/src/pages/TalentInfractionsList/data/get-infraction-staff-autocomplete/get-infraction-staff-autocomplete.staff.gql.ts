import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetInfractionStaffAutocompleteDocument,
  GetInfractionStaffAutocompleteQueryVariables
} from './get-infraction-staff-autocomplete.staff.gql.types'
import { INFRACTION_STAFF_AUTOCOMPLETE_EDGE_FRAGMENT } from '../infraction-staff-autocomplete-edge-fragment'

const DEFAULT_AUTOCOMPLETE_RESULTS_SIZE = 6

export const GET_INFRACTION_STAFF_AUTOCOMPLETE: typeof GetInfractionStaffAutocompleteDocument = gql`
  query GetInfractionStaffAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: ACTIVE_STAFF, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...InfractionStaffAutocompleteEdgeFragment
      }
    }
  }

  ${INFRACTION_STAFF_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetInfractionStaffAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_INFRACTION_STAFF_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getUsers = ({
    term,
    excludedIds,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    term: string
  } & Partial<GetInfractionStaffAutocompleteQueryVariables>) =>
    fetch({ variables: { term, excludedIds, offset, limit } })

  return {
    getUsers,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
