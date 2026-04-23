import { gql } from '@staff-portal/data-layer-service'

export const EDIT_SKILL_NAME_SKILL_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment EditSkillNameSkillAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
  }
`
