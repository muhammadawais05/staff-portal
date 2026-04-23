import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { FEEDBACK_ANSWER_FRAGMENT } from '../../../../data'
import {
  UpdateFeedbackAnswerDocument,
  UpdateFeedbackAnswerMutation
} from './update-feedback-answer.staff.gql.types'

export const UPDATE_FEEDBACK_ANSWER = gql`
  mutation UpdateFeedbackAnswer($input: UpdateFeedbackAnswerInput!) {
    updateFeedbackAnswer(input: $input) {
      feedbackAnswer {
        ...FeedbackAnswerFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${FEEDBACK_ANSWER_FRAGMENT}
`

export const useUpdateFeedbackAnswer = ({
  onCompleted
}: {
  onCompleted?: (data: UpdateFeedbackAnswerMutation) => void
}) =>
  useMutation(UpdateFeedbackAnswerDocument, {
    onCompleted
  })
