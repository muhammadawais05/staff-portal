import { gql } from '@staff-portal/data-layer-service'

export const STAFF_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment StaffAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    entityType
    node {
      ... on Staff {
        id
        fullName
      }
    }
  }
`
