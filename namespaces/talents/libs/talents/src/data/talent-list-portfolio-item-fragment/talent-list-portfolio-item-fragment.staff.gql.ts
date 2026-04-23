import { gql } from '@staff-portal/data-layer-service'

export const TALENT_LIST_PORTFOLIO_ITEM_FRAGMENT = gql`
  fragment TalentListPortfolioItemFragment on PortfolioItem {
    id
    coverPhoto {
      thumbUrl
    }
    title
  }
`
