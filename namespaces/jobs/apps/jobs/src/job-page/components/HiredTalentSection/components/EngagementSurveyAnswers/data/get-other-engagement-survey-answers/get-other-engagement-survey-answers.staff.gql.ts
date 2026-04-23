import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { ENGAGEMENT_SURVEY_ANSWER_FRAGMENT } from '../engagement-survey-answer-fragment'

export const GET_OTHER_ENGAGEMENT_SURVEY_ANSWERS = gql`
  query GetOtherEngagementSurveyAnswers($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        surveyAnswers {
          nodes {
            ...EngagementSurveyAnswerFragment
          }
        }
      }
    }
  }

  ${ENGAGEMENT_SURVEY_ANSWER_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
