import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetBookingObjectsAutocompleteDocument } from './get-booking-objects-autocomplete.staff.gql.types'

export const GET_BOOKING_OBJECTS_AUTOCOMPLETE: typeof GetBookingObjectsAutocompleteDocument = gql`
  query GetBookingObjectsAutocomplete($term: String!) {
    autocomplete(
      filter: { model: BOOKING_OBJECTS, term: $term }
      pagination: { offset: 0, limit: 10 }
    ) {
      edges {
        ...BookingObjectFragment
      }
    }
  }

  fragment BookingObjectFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    node {
      id
    }
  }
`

export const useGetBookingObjectsAutocomplete = () => {
  const [fetch, { data, loading }] = useLazyQuery(
    GET_BOOKING_OBJECTS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getBookingObjects = ({ term }: { term: string }) =>
    fetch({ variables: { term } })

  return {
    getBookingObjects,
    data: data?.autocomplete.edges ?? null,
    loading
  }
}
