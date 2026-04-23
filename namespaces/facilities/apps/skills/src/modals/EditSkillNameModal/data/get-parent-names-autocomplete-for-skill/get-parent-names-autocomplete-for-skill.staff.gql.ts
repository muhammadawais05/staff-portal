import { gql } from '@staff-portal/data-layer-service'

import { EDIT_SKILL_NAME_SKILL_AUTOCOMPLETE_EDGE_FRAGMENT } from '../edit-skill-name-skill-autocomplete-edge-fragment'

export default gql`
  query GetPossibleParentNamesAutocompleteForSkill(
    $skillId: ID!
    $term: String!
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $skillId) {
      ...EditSkillNameSkillFragment
    }
  }

  fragment EditSkillNameSkillFragment on Skill {
    possibleParentNamesAutocomplete(
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
