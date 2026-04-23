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

const updateScheduleInternalInterviewStubs = () => {
  const interview = interviewMock({
    interview: {
      disableCompanyNotifications: false
    },
    operations: {
      scheduleInternalSingleCommitInterview: enabledOperationMock(),
      proposeInternalInterviewTimeSlots: enabledOperationMock()
    },
    talent: { toptalEmail: 'toptal-mock@toptal.io' }
  })
  const engagement = interview.engagement

  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.PENDING,
      newInternalInterview: interview
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
    GetScheduleInternalInterviewData: {
      data: {
        node: {
          id: 'VjEtRW5nYWdlbWVudC0yODgxODU',
          newInternalInterview: interview,
          operations: {
            scheduleInternalSingleCommitInterview: successMutationMock(),
            proposeInternalInterviewTimeSlots: successMutationMock()
          },
          ...engagement,
          __typename: 'Engagement'
        },
        experiments: {}
      }
    },
    GetEngagementScheduleInternalInterviewOperation: {
      data: {
        node: {
          id: 'VjEtRW5nYWdlbWVudC0yODgxODU',
          latestInternalInterview: {
            nodes: [],
            __typename: 'InterviewConnection'
          },
          newInternalInterview: interview,
          __typename: 'Engagement'
        },
      }
    },
    ScheduleInternalSingleCommitInterview: {
      data: { scheduleInternalSingleCommitInterview: successMutationMock() }
    },
    ProposeInternalInterviewTimeSlots: {
      data: { proposeInternalInterviewTimeSlots: successMutationMock() }
    }
  })
}

export default updateScheduleInternalInterviewStubs
