import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_SURVEY_ANSWER_FRAGMENT = gql`
  fragment EngagementSurveyAnswerFragment on EngagementSurveyAnswer {
    id
    createdAt
    kind
    answers {
      type
      question
      decoratedAnswer {
        alerted
        value
      }
    }
  }
`
