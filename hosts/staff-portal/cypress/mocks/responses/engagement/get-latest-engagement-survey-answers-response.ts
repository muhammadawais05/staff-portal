import { Engagement } from '@staff-portal/graphql/staff'

import { getEngagementMock } from '~integration/mocks/fragments'

export const getLatestEngagementSurveyAnswers = (
  engagement?: Partial<Engagement>
) => ({
  data: {
    node: {
      ...getEngagementMock(engagement),
      talentSurveyTotalCount: {
        totalCount: 0,
        __typename: 'EngagementSurveyAnswerConnection'
      },
      recentTalentSurvey: {
        nodes: [],
        __typename: 'EngagementSurveyAnswerConnection'
      },
      clientSurveyTotalCount: {
        totalCount: 0,
        __typename: 'EngagementSurveyAnswerConnection'
      },
      recentClientSurvey: {
        nodes: [],
        __typename: 'EngagementSurveyAnswerConnection'
      }
    }
  }
})
