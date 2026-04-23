import { gql } from '@staff-portal/data-layer-service'

import { NOTE_SOFT_SKILL_FRAGMENT } from '../note-soft-skill-fragment'

export const NOTE_SOFT_SKILL_RATING_FRAGMENT = gql`
  fragment NoteSoftSkillRatingFragment on SoftSkillRating {
    id
    comment
    value
    softSkill {
      id
      name
    }
  }
`

export const NOTE_SOFT_SKILL_RATING_WITH_HINTS_FRAGMENT = gql`
  fragment NoteSoftSkillRatingWithHintsFragment on SoftSkillRating {
    id
    comment
    value
    softSkill {
      ...NoteSoftSkillFragment
    }
  }

  ${NOTE_SOFT_SKILL_FRAGMENT}
`
