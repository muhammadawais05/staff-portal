import { gql } from '@staff-portal/data-layer-service'

export const MEETING_ATTENDEE_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment MeetingAttendeeAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ... on Node {
        id
      }
    }
    nodeTypes
    photo {
      thumb
    }
  }
`
