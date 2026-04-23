import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetStaffAutocompleteDocument,
  GetStaffAutocompleteQuery
} from './get-staff-autocomplete.staff.gql.types'

export const GET_STAFF_AUTOCOMPLETE: typeof GetStaffAutocompleteDocument = gql`
  query GetStaffAutocomplete(
    $activationId: ID!
    $term: String!
    $activationStepId: ID!
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $activationId) {
      ... on Activation {
        id
        staffAutocomplete(
          filter: { term: $term, activationStepId: $activationStepId }
          pagination: { offset: $offset, limit: $limit }
        ) {
          edges {
            node {
              id
              fullName
            }
          }
        }
      }
    }
  }
`

type UseGetStaffAutocompleteArgs = {
  activationId: string
  activationStepId: string
  onCompleted: (
    users: NonNullable<
      GetStaffAutocompleteQuery['node']
    >['staffAutocomplete']['edges']
  ) => void
}

export const useGetStaffAutocomplete = ({
  activationId,
  activationStepId,
  onCompleted
}: UseGetStaffAutocompleteArgs) => {
  const [fetch, { ...options }] = useLazyQuery(GET_STAFF_AUTOCOMPLETE, {
    fetchPolicy: 'cache-first',
    onCompleted: (data: GetStaffAutocompleteQuery) =>
      onCompleted(data?.node?.staffAutocomplete.edges ?? [])
  })

  const fetchUsers = (
    term = '',
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  ) =>
    fetch({
      variables: { activationId, term, activationStepId, offset, limit }
    })

  return {
    fetchUsers,
    ...options
  }
}
