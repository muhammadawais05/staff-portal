import { EngagementStatus } from '@staff-portal/graphql/staff'

import { interviewMock } from '~integration/mocks/fragments'
import { timeZoneMock } from '~integration/mocks/fragments/time-zone-mock'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  getAvailableTimeZonesResponse,
  getInterviewTimeSlotsForTimeZoneResponse
} from '~integration/mocks/responses'

const updateScheduleInterviewStubs = () => {
  const interview = interviewMock({
    interview: {
      disableCompanyNotifications: false
    },
    operations: {
      proposeInterviewTimeSlots: enabledOperationMock(),
      scheduleSingleCommitInterview: enabledOperationMock()
    },
    talent: { toptalEmail: 'toptal-mock@toptal.io' }
  })
  const engagement = interview.engagement

  return cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.PENDING,
      newExternalInterview: interview
    }),
    GetAvailableTimeZones: getAvailableTimeZonesResponse([
      timeZoneMock(),
      timeZoneMock({
        name: '(UTC+02:00) Europe - Bucharest',
        value: 'Bucharest/Romania'
      })
    ]),
    GetInterviewTimeSlotsForTimeZone:
      getInterviewTimeSlotsForTimeZoneResponse(),
    GetScheduleInterviewData: {
      data: {
        node: {
          id: 'VjEtRW5nYWdlbWVudC0yODgxODU',
          newExternalInterview: interview,
          operations: {
            scheduleSingleCommitInterview: successMutationMock()
          },
          ...engagement,
          __typename: 'Engagement'
        },
        experiments: {}
      }
    },
    GetEngagementScheduleInterviewOperation: {
      data: {
        node: {
          id: 'VjEtRW5nYWdlbWVudC0yODgxODU',
          latestExternalInterview: {
            nodes: [],
            __typename: 'InterviewConnection'
          },
          newExternalInterview: interview,
          __typename: 'Engagement'
        },
      }
    },
    ProposeInterviewTimeSlots: {
      data: { proposeInterviewTimeSlots: successMutationMock() }
    },
    ScheduleSingleCommitInterview: {
      data: { scheduleSingleCommitInterview: successMutationMock() }
    }
  })
}

export default updateScheduleInterviewStubs
