import { gql } from '@staff-portal/data-layer-service'
import { FEEDBACK_WITH_ANSWERS_FRAGMENT } from '@staff-portal/feedbacks'

export const GET_ENGAGEMENT_PAUSED_FEEDBACKS = gql`
  query GetEngagementPausedFeedbacks($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        feedbacks(filter: { action: ENGAGEMENT_PAUSED }) {
          nodes {
            ...FeedbackWithAnswersFragment
          }
        }
      }
    }
  }

  ${FEEDBACK_WITH_ANSWERS_FRAGMENT}
`
