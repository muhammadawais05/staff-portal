import { gql } from '@staff-portal/data-layer-service'

export const FEEDBACK_ANSWER_FRAGMENT = gql`
  fragment FeedbackAnswerFragment on FeedbackAnswer {
    id
    tooltip
    performer {
      __typename
      ... on Node {
        id
      }
    }
    option {
      id
      value
      question {
        id
        label
      }
    }
    operations {
      updateFeedbackAnswer {
        ...OperationFragment
      }
    }
  }
`
