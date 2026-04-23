import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const GET_ENGAGEMENT_CLIENT_INTERVIEW_FEEDBACK = gql`
  query GetEngagementClientInterviewFeedback($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        status
        client {
          id
          ...WebResourceFragment
        }
        interview {
          ...EngagementClientInterviewFeedbackFragment
        }
      }
    }
  }

  fragment EngagementClientInterviewFeedbackFragment on Interview {
    id
    status
    rating
    ratingComment
    ratingFacets {
      name
      value
    }
    timeRejectComment
    notReadyFeedback {
      id
      comment
      answers {
        nodes {
          id
          option {
            id
            value
          }
        }
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`
