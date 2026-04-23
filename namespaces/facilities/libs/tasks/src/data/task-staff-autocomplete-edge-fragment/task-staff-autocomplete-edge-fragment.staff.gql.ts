import { gql } from '@staff-portal/data-layer-service'

export const TASK_STAFF_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment TaskStaffAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...TaskStaffFragment
    }
  }

  fragment TaskStaffFragment on Staff {
    id
    fullName
  }
`
