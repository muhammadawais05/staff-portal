import { gql } from '@staff-portal/data-layer-service'

export const CLIENT_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment ClientAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    entityType
    photo {
      thumb
    }
    entityType
    node {
      ... on Client {
        id
        companyLegacyId
      }
    }
  }
`
