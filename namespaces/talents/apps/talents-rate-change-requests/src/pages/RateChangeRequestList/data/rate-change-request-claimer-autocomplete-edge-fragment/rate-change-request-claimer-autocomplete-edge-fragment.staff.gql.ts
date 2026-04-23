import { gql } from '@staff-portal/data-layer-service'

import { RATE_CHANGE_REQUEST_CLAIMER_FRAGMENT } from '../rate-change-request-claimer-fragment'

// infraction-staff-fragment/infraction-staff-fragment.staff.gql.ts
// rate-change-request-claimer-fragment/rate-change-request-claimer-fragment.staff.gql.ts

export const RATE_CHANGE_REQUEST_CLAIMER_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment RateChangeRequestClaimerAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...RateChangeRequestClaimerFragment
    }
  }

  ${RATE_CHANGE_REQUEST_CLAIMER_FRAGMENT}
`
