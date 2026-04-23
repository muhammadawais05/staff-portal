import { gql } from '@staff-portal/data-layer-service'

export const VERTICAL_FRAGMENT = gql`
  fragment VerticalFragment on Vertical {
    id
    talentType
    defaultSkillCategory {
      id
    }
  }
`
