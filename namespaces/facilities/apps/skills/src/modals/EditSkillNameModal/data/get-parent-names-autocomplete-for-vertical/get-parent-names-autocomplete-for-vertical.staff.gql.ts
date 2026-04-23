import { gql } from '@staff-portal/data-layer-service'

import { EDIT_SKILL_NAME_SKILL_AUTOCOMPLETE_EDGE_FRAGMENT } from '../edit-skill-name-skill-autocomplete-edge-fragment'

export default gql`
  query GetPossibleParentNamesAutocompleteForVertical(
    $verticalId: ID!
    $term: String!
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $verticalId) {
      ...EditSkillNameSkillForVerticalFragment
    }
  }

  fragment EditSkillNameSkillForVerticalFragment on Vertical {
    possibleParentSkillNamesAutocomplete(
      filter: { term: $term }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...EditSkillNameSkillAutocompleteEdgeFragment
      }
    }
  }

  ${EDIT_SKILL_NAME_SKILL_AUTOCOMPLETE_EDGE_FRAGMENT}
`
