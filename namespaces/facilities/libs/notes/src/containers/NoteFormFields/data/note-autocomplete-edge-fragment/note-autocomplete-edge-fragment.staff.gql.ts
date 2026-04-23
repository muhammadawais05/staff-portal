import { gql } from '@staff-portal/data-layer-service'

export const NOTE_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment NoteAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
  }
`
