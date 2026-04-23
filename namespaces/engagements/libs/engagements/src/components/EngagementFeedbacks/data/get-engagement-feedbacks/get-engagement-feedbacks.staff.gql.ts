import { gql } from '@staff-portal/data-layer-service'
import { FEEDBACK_WITH_ANSWERS_FRAGMENT } from '@staff-portal/feedbacks'

export const GET_ENGAGEMENT_FEEDBACKS = gql`
  query GetEngagementFeedbacks($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        feedbacks {
          nodes {
            ...FeedbackWithAnswersFragment
          }
        }
      }
    }
  }

  ${FEEDBACK_WITH_ANSWERS_FRAGMENT}
`
