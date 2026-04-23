import { gql } from '@staff-portal/data-layer-service'

export const VERTICAL_SKILL_FRAGMENT = gql`
  fragment VerticalSkillFragment on Skill {
    id
    name
    competentProfilesCount
    expertProfilesCount
    strongProfilesCount
    totalProfilesCount
    category {
      id
      title
      description
      position
    }
  }
`
