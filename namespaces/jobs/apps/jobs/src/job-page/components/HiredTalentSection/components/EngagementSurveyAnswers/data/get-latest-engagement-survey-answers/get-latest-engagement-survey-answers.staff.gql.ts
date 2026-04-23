import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { ENGAGEMENT_SURVEY_ANSWER_FRAGMENT } from '../engagement-survey-answer-fragment'

export const GET_LATEST_ENGAGEMENT_SURVEY_ANSWERS = gql`
  query GetLatestEngagementSurveyAnswers($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        talent {
          id
          fullName
          ...WebResourceFragment
        }
        client {
          id
          fullName
          ...WebResourceFragment
        }
        talentSurveyTotalCount: surveyAnswers(filter: { kind: [TALENT] }) {
          totalCount
        }
        recentTalentSurvey: surveyAnswers(
          filter: { kind: [TALENT] }
          pagination: { offset: 0, limit: 1 }
        ) {
          nodes {
            ...EngagementSurveyAnswerFragment
          }
        }
        clientSurveyTotalCount: surveyAnswers(filter: { kind: [CLIENT] }) {
          totalCount
        }
        recentClientSurvey: surveyAnswers(
          filter: { kind: [CLIENT] }
          pagination: { offset: 0, limit: 1 }
        ) {
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
