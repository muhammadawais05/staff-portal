import { VoteForTalentPortfolioFileInput } from '@staff-portal/graphql/staff'

import { VOTE_FOR_TALENT_PORTFOLIO_FILE } from './vote-for-talent-portfolio-file.staff.gql'

export const createVoteForTalentPortfolioMock = (
  input: VoteForTalentPortfolioFileInput
) => ({
  request: {
    query: VOTE_FOR_TALENT_PORTFOLIO_FILE,
    variables: { input }
  },
  result: {
    data: {
      voteForTalentPortfolioFile: {
        success: true,
        errors: [],
        __typename: 'VoteForTalentPortfolioFilePayload',
        emailTemplate: {
          id: null
        },
        nextActionPerformable: false
      }
    }
  }
})

export const createVoteForTalentPortfolioFailedMock = (
  input: VoteForTalentPortfolioFileInput,
  errorMessage = 'Network error occurred.'
) => ({
  request: {
    query: VOTE_FOR_TALENT_PORTFOLIO_FILE,
    variables: { input }
  },
  error: new Error(errorMessage)
})
