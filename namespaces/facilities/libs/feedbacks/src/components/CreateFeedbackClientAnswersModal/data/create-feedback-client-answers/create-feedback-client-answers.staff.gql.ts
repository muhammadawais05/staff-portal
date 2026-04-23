import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { FEEDBACK_WITH_ANSWERS_FRAGMENT } from '../../../../data'
import {
  CreateFeedbackClientAnswersDocument,
  CreateFeedbackClientAnswersMutation
} from './create-feedback-client-answers.staff.gql.types'

export const CREATE_FEEDBACK_CLIENT_ANSWERS = gql`
  mutation CreateFeedbackClientAnswers(
    $input: CreateFeedbackClientAnswersInput!
  ) {
    createFeedbackClientAnswers(input: $input) {
      feedback {
        ...FeedbackWithAnswersFragment
      }
      ...MutationResultFragment
    }
  }

  ${FEEDBACK_WITH_ANSWERS_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateFeedbackClientAnswers = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateFeedbackClientAnswersMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CreateFeedbackClientAnswersDocument, {
    onCompleted,
    onError
  })
