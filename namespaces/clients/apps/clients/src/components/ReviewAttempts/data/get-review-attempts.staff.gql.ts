import { gql } from '@staff-portal/data-layer-service'

import { REVIEW_ATTEMPT_FRAGMENT } from './review-attempt.staff.gql'

export default gql`
  query GetReviewAttempts($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        reviewAttempts(order: { field: CREATED_AT, direction: ASC }) {
          nodes {
            ...ReviewAttemptFragment
          }
          totalCount
        }
      }
    }
  }

  ${REVIEW_ATTEMPT_FRAGMENT}
`
