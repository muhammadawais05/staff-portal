import { VoteForTalentPortfolioFileInput } from '@staff-portal/graphql/staff'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  VoteForTalentPortfolioFileDocument,
  VoteForTalentPortfolioFileMutation
} from './vote-for-talent-portfolio-file.staff.gql.types'

export const VOTE_FOR_TALENT_PORTFOLIO_FILE: typeof VoteForTalentPortfolioFileDocument = gql`
  mutation VoteForTalentPortfolioFile(
    $input: VoteForTalentPortfolioFileInput!
  ) {
    voteForTalentPortfolioFile(input: $input) {
      emailTemplate {
        id
      }
      nextActionPerformable

      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useVoteForTalentPortfolioFile = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: VoteForTalentPortfolioFileMutation) => void
  onError?: (error: Error) => void
}) => {
  const [voteForPortfolioFile] = useMutation(VOTE_FOR_TALENT_PORTFOLIO_FILE, {
    onCompleted,
    onError
  })

  return {
    voteForPortfolioFile: (input: VoteForTalentPortfolioFileInput) =>
      voteForPortfolioFile({
        variables: {
          input
        }
      })
  }
}
