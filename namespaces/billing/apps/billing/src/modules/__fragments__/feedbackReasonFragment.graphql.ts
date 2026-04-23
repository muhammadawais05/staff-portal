import { gql } from '@apollo/client'

export const feedbackReasonFragment = gql`
  fragment FeedbackReasonFragment on FeedbackReason {
    id
    identifier
    name
  }
`
