import { gql } from '@staff-portal/data-layer-service'

import { FEEDBACK_ANSWER_FRAGMENT } from '../feedback-answer-fragment'
import { FEEDBACK_DETAILS_FRAGMENT } from '../feedback-details-fragment'

export const FEEDBACK_WITH_ANSWERS_FRAGMENT = gql`
  fragment FeedbackWithAnswersFragment on Feedback {
    ...FeedbackDetailsFragment

    additionalQuestions
    clientQuestions {
      nodes {
        id
      }
    }
    matcherQuestions {
      nodes {
        id
      }
    }

    clientAnswers {
      nodes {
        ...FeedbackAnswerFragment
      }
    }
    matcherAnswers {
      nodes {
        ...FeedbackAnswerFragment
      }
    }
    talentAnswers {
      nodes {
        ...FeedbackAnswerFragment
      }
    }
  }

  ${FEEDBACK_DETAILS_FRAGMENT}
  ${FEEDBACK_ANSWER_FRAGMENT}
`
