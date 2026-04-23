import { gql } from '@staff-portal/data-layer-service'

export const GET_CLIENT_ENGAGEMENT_SURVEY_QUESTIONS = gql`
  query GetClientEngagementSurveyQuestions {
    clientEngagementSurveyQuestions {
      answers {
        title
        score
      }
      type
      note
      required
      title
    }
  }
`
