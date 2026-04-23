import {
  Engagement,
  EngagementStatus,
  InterviewKind
} from '@staff-portal/graphql/staff'

import { interviewMock } from '~integration/mocks/fragments'
import { timeZoneMock } from '~integration/mocks/fragments/time-zone-mock'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getAvailableTimeZonesResponse,
  getInterviewTimeSlotsForTimeZoneResponse
} from '~integration/mocks/responses'

const updateRescheduleInternalInterviewStubs = (
  engagement?: Partial<Engagement>
) => {
  const interview = interviewMock({
    interview: {
      ...engagement?.interviews?.nodes?.[0],
      kind: InterviewKind.INTERNAL,
      schedulingComment: 'some comment',
      disableCompanyNotifications: false
    },
    operations: {
      clearAndChangeInternalInterviewProposedTimeSlots: enabledOperationMock(),
      clearAndRescheduleInternalSingleCommitInterview: enabledOperationMock()
    },
    talent: { toptalEmail: 'toptal-mock@toptal.io' }
  })

  return cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.PENDING,
      newInternalInterview: interview,
      ...engagement
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
    GetRescheduleInternalInterviewData: {
      data: { node: interview, experiments: {} }
    },
    GetRescheduleInternalInterviewOperation: {
      data: {
        node: {
          id: interview.id,
          operations: interview.operations,
          __typename: 'Interview'
        }
      }
    },
    ClearAndChangeInternalInterviewProposedTimeSlots: {
      data: {
        clearAndChangeInternalInterviewProposedTimeSlots: successMutationMock()
      }
    },
    ClearAndRescheduleInternalSingleCommitInterview: {
      data: {
        clearAndRescheduleInternalSingleCommitInterview: successMutationMock()
      }
    }
  })
}

export default updateRescheduleInternalInterviewStubs
