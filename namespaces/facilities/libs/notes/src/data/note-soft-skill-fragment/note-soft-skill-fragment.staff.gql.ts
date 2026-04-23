import { gql } from '@staff-portal/data-layer-service'

export const NOTE_SOFT_SKILL_FRAGMENT = gql`
  fragment NoteSoftSkillRatingHintFragment on SoftSkillRatingHint {
    description
    title
    value
  }

  fragment NoteSoftSkillFragment on SoftSkill {
    id
    name
    ratingHints {
      ...NoteSoftSkillRatingHintFragment
    }
  }
`
