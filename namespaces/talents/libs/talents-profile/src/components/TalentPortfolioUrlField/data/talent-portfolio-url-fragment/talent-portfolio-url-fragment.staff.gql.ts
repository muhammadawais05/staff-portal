import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PORTFOLIO_URL_FRAGMENT = gql`
  fragment TalentPortfolioUrlFragment on Talent {
    id
    portfolio {
      url
    }
  }
`
