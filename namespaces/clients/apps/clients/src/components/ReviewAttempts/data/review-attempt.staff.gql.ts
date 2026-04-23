import { gql } from '@staff-portal/data-layer-service'

export const REVIEW_ATTEMPT_FRAGMENT = gql`
  fragment ReviewAttemptFragment on ReviewAttempt {
    commentary
    createdAt
    id
    kind
    reviewLink
  }
`
