import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTalentInterviewFeedback($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        talent {
          ...InterviewFeedbackSubmitterFragment
        }
        interview {
          id
          surveyAnswer {
            ...SurveyAnswerFragment
          }
        }
      }
    }
  }

  fragment InterviewFeedbackSubmitterFragment on Talent {
    id
    resumeUrl
    webResource {
      text
      url
    }
  }

  fragment SurveyAnswerFragment on InterviewSurveyAnswer {
    rating
    comment
    answeredAt
  }
`
