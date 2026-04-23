import { TalentPortfolioFragment } from '../talent-portfolio-fragment'
import { GET_TALENT_PORTFOLIO } from './get-talent-portfolio.staff.gql'
import { createTalentPortfolioMock } from '../talent-portfolio-fragment/mocks'

export const createGetTalentPortfolioMock = ({
  talentId = '123',
  talentFullName = 'John',
  portfolioData
}: {
  talentId?: string
  talentFullName?: string
  portfolioData?: TalentPortfolioFragment
} = {}) => ({
  request: { query: GET_TALENT_PORTFOLIO, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        fullName: talentFullName,
        ...createTalentPortfolioMock(portfolioData),
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentPortfolioEmptyMock = ({
  talentId = '123',
  talentFullName = 'John'
}: {
  talentId?: string
  talentFullName?: string
} = {}) => ({
  request: { query: GET_TALENT_PORTFOLIO, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        fullName: talentFullName,
        portfolio: null,
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentPortfolioFailedMock = ({
  talentId = '123',
  errorMessage = 'fake error message.'
}: {
  talentId?: string
  errorMessage?: string
}) => ({
  request: { query: GET_TALENT_PORTFOLIO, variables: { talentId } },
  error: new Error(errorMessage)
})
