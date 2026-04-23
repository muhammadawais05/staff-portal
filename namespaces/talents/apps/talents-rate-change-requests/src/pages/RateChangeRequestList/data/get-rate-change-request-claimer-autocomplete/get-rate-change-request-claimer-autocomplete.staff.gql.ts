import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetRateChangeRequestClaimerAutocompleteDocument,
  GetRateChangeRequestClaimerAutocompleteQueryVariables
} from './get-rate-change-request-claimer-autocomplete.staff.gql.types'
import { RATE_CHANGE_REQUEST_CLAIMER_AUTOCOMPLETE_EDGE_FRAGMENT } from '../rate-change-request-claimer-autocomplete-edge-fragment'

const DEFAULT_AUTOCOMPLETE_RESULTS_SIZE = 6

export const GET_RATE_CHANGE_REQUEST_CLAIMER_AUTOCOMPLETE: typeof GetRateChangeRequestClaimerAutocompleteDocument = gql`
  query GetRateChangeRequestClaimerAutocomplete(
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
        ...RateChangeRequestClaimerAutocompleteEdgeFragment
      }
    }
  }

  ${RATE_CHANGE_REQUEST_CLAIMER_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetRateChangeRequestClaimerAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_RATE_CHANGE_REQUEST_CLAIMER_AUTOCOMPLETE,
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
  } & Partial<GetRateChangeRequestClaimerAutocompleteQueryVariables>) =>
    fetch({ variables: { term, excludedIds, offset, limit } })

  return {
    getUsers,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
