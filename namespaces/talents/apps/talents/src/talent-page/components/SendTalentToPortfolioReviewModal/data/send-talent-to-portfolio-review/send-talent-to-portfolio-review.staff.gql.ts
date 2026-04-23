import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  SendTalentToPortfolioReviewDocument,
  SendTalentToPortfolioReviewMutation
} from './send-talent-to-portfolio-review.staff.gql.types'

export const SEND_TALENT_TO_PORTFOLIO_REVIEW: typeof SendTalentToPortfolioReviewDocument = gql`
  mutation SendTalentToPortfolioReview(
    $input: SendTalentToPortfolioReviewInput!
  ) {
    sendTalentToPortfolioReview(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSendTalentToPortfolioReview = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: SendTalentToPortfolioReviewMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(SEND_TALENT_TO_PORTFOLIO_REVIEW, { onCompleted, onError })
