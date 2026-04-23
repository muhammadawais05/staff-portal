import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { ApolloClient, gql } from '@staff-portal/data-layer-service'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { STAFF_AUTOCOMPLETE_EDGE_FRAGMENT } from '../staff-autocomplete-edge-fragment/staff-autocomplete-edge-fragment.staff.gql'
import { GetStaffAutocompleteDocument } from './get-staff-autocomplete.staff.gql.types'

export default gql`
  query GetStaffAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
    $model: AutocompleteModels!
    $excludedIds: [ID!]
  ) {
    autocomplete(
      filter: { term: $term, model: $model, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...StaffAutocompleteEdgeFragment
      }
    }
  }
  ${STAFF_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const getStaffAutocomplete = async (
  term: string,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetStaffAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0,
      model: AutocompleteModels.STAFF
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}
