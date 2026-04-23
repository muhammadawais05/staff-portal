import {
  Engagement,
  EngagementStatus,
  Interview,
  InterviewConnection,
  InterviewCumulativeStatus,
  InterviewSurveyAnswer,
  Link,
  Talent
} from '@staff-portal/graphql/staff'

import {
  feedbackMock,
  getEngagementMock,
  getInterviewMock,
  timeZoneMock
} from '~integration/mocks/fragments'
import { engagementBreaksMock } from '~integration/mocks/fragments/engagement-breaks-mock'
import { engagementPageStubs } from '~integration/mocks/request-stubs'

const updateEngagementPageStubs = () => {
  const commonEngagement = getEngagementMock({
    status: EngagementStatus.ACTIVE,
    feedbacks: { totalCount: 1, nodes: [{ ...feedbackMock() }] },
    engagementBreaks: {
      totalCount: 1,
      nodes: [{ ...engagementBreaksMock() }]
    },
    talent: {
      resumeUrl:
        'https://staging.toptal.net/finance/resume/obfuscated_slug_637630',
      webResource: {
        text: 'Danyell Walker',
        url: 'https://staging.toptal.net/platform/staff/talents/1346749',
        __typename: 'Link'
      } as Link
    } as Talent
  }) as Engagement

  const interview = getInterviewMock({
    cumulativeStatus: InterviewCumulativeStatus.PENDING,
    scheduledAtTimes: ['2021-09-24T08:45:00-04:00'],
    timeZone: timeZoneMock(),
    rating: 3,
    surveyAnswer: {
      __typename: 'InterviewSurveyAnswer',
      rating: 3,
      comment: '',
      answeredAt: '2021-12-31'
    } as InterviewSurveyAnswer,
    engagement: commonEngagement
  }) as Interview

  const engagement = getEngagementMock({
    ...commonEngagement,
    interviews: {
      __typename: 'InterviewConnection',
      totalCount: 1,
      nodes: [interview]
    } as InterviewConnection,
    interview
  })

  return cy.stubGraphQLRequests({
    ...engagementPageStubs(engagement)
  })
}

export default updateEngagementPageStubs
