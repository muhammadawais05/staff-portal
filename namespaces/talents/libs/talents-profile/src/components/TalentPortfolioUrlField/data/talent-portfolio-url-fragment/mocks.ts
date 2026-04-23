import { TalentPortfolioUrlFragment } from './talent-portfolio-url-fragment.staff.gql.types'

export const createTalentPortfolioUrlMock = (
  portfolio?: TalentPortfolioUrlFragment['portfolio']
) => ({
  portfolio: {
    url: 'TEST_LINK',
    ...portfolio,
    __typename: 'TalentPortfolio'
  }
})
