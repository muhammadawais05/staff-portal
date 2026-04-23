import { TalentPortfolioUrlFragment } from '../talent-portfolio-url-fragment'
import { GET_TALENT_PORTFOLIO_URL } from './get-talent-portfolio-url.staff.gql'
import { createTalentPortfolioUrlMock } from '../talent-portfolio-url-fragment/mocks'

export const createGetTalentPortfolioUrlMock = ({
  talentId = '123',
  portfolio
}: {
  talentId?: string
  portfolio?: TalentPortfolioUrlFragment['portfolio']
} = {}) => ({
  request: { query: GET_TALENT_PORTFOLIO_URL, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        ...createTalentPortfolioUrlMock(portfolio),
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentPortfolioUrlFailedMock = ({
  talentId = '123',
  errorMessage = 'fake error message.'
}: {
  talentId?: string
  errorMessage?: string
}) => ({
  request: { query: GET_TALENT_PORTFOLIO_URL, variables: { talentId } },
  error: new Error(errorMessage)
})
