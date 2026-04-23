import { gql } from '@staff-portal/data-layer-service'

export const TALENT_WORK_EXPERIENCE_PORTFOLIO_ITEM_FRAGMENT = gql`
  fragment TalentWorkExperiencePortfolioItemFragment on PortfolioItem {
    id
    coverPhoto {
      coverUrl
    }
    title
    kindEnum
    link
    description
    skills {
      nodes {
        id
        name
        skillPage {
          publicUrl
        }
      }
    }
  }
`
