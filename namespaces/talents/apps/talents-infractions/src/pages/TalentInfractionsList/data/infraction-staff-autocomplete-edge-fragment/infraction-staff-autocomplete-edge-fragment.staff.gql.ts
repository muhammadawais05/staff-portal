import { gql } from '@staff-portal/data-layer-service'

import { INFRACTION_STAFF_FRAGMENT } from '../infraction-staff-fragment'

export const INFRACTION_STAFF_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment InfractionStaffAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...InfractionStaffFragment
    }
  }

  ${INFRACTION_STAFF_FRAGMENT}
`
