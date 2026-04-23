import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { SendBetaFeedbackDocument } from './send-beta-feedback.staff.gql.types'

export const SEND_BETA_FEEDBACK = gql`
mutation SendBetaFeedback (
  $reason: String!,
  $pageUrl: String!,
  $comment: String, 
  $logRocketSessionUrl: String
) {
  feedbackBeta(input: {
    reason: $reason,
    pageUrl: $pageUrl,
    comment: $comment,
    logRocketSessionUrl: $logRocketSessionUrl
  }){
    ...MutationResultFragment
  }

  ${MUTATION_RESULT_FRAGMENT}
}
`

export const useSendBetaFeedback = () => useMutation(SendBetaFeedbackDocument)
