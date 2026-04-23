import { gql } from '@staff-portal/data-layer-service'

export const TALENT_VERTICAL_FRAGMENT = gql`
  fragment TalentVerticalFragment on Vertical {
    id
    talentType
    specializations {
      nodes {
        id
        title
      }
    }
  }
`
