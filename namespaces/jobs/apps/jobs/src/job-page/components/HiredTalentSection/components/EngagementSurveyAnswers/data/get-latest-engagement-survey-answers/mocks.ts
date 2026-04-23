import { GetLatestEngagementSurveyAnswersQuery } from './get-latest-engagement-survey-answers.staff.gql.types'
import { EngagementSurveyAnswerFragment } from '../engagement-survey-answer-fragment'

export const createLatestEngagementSurveyAnswersMock = ({
  talentSurveyTotalCount = 0,
  clientSurveyTotalCount = 0,
  recentTalentSurveyAnswers = [],
  recentClientSurveyAnswers = []
}: {
  talentSurveyTotalCount?: number
  clientSurveyTotalCount?: number
  recentTalentSurveyAnswers?: EngagementSurveyAnswerFragment[]
  recentClientSurveyAnswers?: EngagementSurveyAnswerFragment[]
} = {}): GetLatestEngagementSurveyAnswersQuery => ({
  node: {
    id: 'VjEtRW5nYWdlbWVudC0xNzQ5NzY',
    talent: {
      id: 'VjEtVGFsZW50LTEyNDQwMA',
      fullName: 'Elise Prohaska',
      webResource: {
        text: 'Elise Prohaska',
        url: 'https://staging.toptal.net/platform/staff/talents/124400'
      }
    },
    client: {
      id: 'VjEtQ2xpZW50LTIwNDI2MQ',
      fullName: 'Dietrich, Grady and Gusikowski',
      webResource: {
        text: 'Dietrich, Grady and Gusikowski',
        url: 'https://staging.toptal.net/platform/staff/companies/796998'
      }
    },
    talentSurveyTotalCount: {
      totalCount: talentSurveyTotalCount
    },
    recentTalentSurvey: {
      nodes: recentTalentSurveyAnswers
    },
    clientSurveyTotalCount: {
      totalCount: clientSurveyTotalCount
    },
    recentClientSurvey: {
      nodes: recentClientSurveyAnswers
    }
  }
})
