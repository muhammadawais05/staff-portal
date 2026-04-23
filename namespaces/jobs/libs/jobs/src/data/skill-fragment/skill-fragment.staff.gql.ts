import { gql } from '@staff-portal/data-layer-service'

export const SKILL_FRAGMENT = gql`
  fragment SkillFragment on Skill {
    id
    name
    competentProfilesCount
    expertProfilesCount
    strongProfilesCount
    totalProfilesCount
    category {
      id
      title
      position
    }
  }
`
