import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { FEEDBACK_WITH_ANSWERS_FRAGMENT } from '../../../../data'

export const CREATE_FEEDBACK_MATCHER_ANSWERS = gql`
  mutation CreateFeedbackMatcherAnswers(
    $input: CreateFeedbackMatcherAnswersInput!
  ) {
    createFeedbackMatcherAnswers(input: $input) {
      feedback {
        ...FeedbackWithAnswersFragment
      }
      ...MutationResultFragment
    }
  }

  ${FEEDBACK_WITH_ANSWERS_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
