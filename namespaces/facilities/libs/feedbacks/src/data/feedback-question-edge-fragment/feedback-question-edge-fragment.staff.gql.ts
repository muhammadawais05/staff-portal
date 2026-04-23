import { gql } from '@staff-portal/data-layer-service'

export const FEEDBACK_QUESTION_EDGE_FRAGMENT = gql`
  fragment FeedbackQuestionEdgeFragment on FeedbackQuestionEdge {
    text
    node {
      id
      identifier
      options {
        nodes {
          id
          tooltip
          value
        }
      }
    }
  }
`
