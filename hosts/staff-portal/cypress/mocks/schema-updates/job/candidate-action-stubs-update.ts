import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  Engagement,
  EngagementStatus,
  JobStatus,
  TalentJobIssue,
  TimeZone
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementMock } from '~integration/mocks/fragments'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  getAcceptCandidateModalDataResponse,
  getAcceptCandidateOperationResponse,
  getInterviewTimeSlotsForTimeZoneResponse,
  getJobCandidatesEngagementResponse,
  getJobPageCandidatesResponse,
  getScheduleInterviewDataResponse
} from '~integration/mocks/responses'
import { jobPageStubs } from '../../request-stubs'

const updateCandidateActionStubs = () => {
  const client = {
    contracts: { totalCount: 1 },
    timeZone: {
      name: '(UTC-06:00) America - Chicago',
      value: 'America/Chicago',
      __typename: 'TimeZone'
    } as unknown as TimeZone
  } as Client

  const engagement = {
    status: EngagementStatus.PENDING,
    client,
    operations: getEngagementOperations({
      expireEngagement: enabledOperationMock(),
      cancelEngagementInInterview: enabledOperationMock(),
      rejectEngagementOnInterview: enabledOperationMock(),
      scheduleEngagementActivationStartDate: enabledOperationMock(),
      changeEngagementCommitment: enabledOperationMock()
    })
  }

  const job = { status: JobStatus.ACTIVE }

  cy.stubGraphQLRequests({
    ...jobPageStubs(job),
    GetJobPageCandidates: getJobPageCandidatesResponse(job, [
      {
        jobIssues: { failedMetrics: [], status: TalentJobIssue.OK },
        node: getEngagementMock(engagement) as Engagement
      }
    ]),
    GetEngagement: getJobCandidatesEngagementResponse(engagement),
    GetLazyOperation: getAcceptCandidateOperationResponse(),
    GetAcceptCandidateModalData:
      getAcceptCandidateModalDataResponse(engagement),
    GetAvailableTimeZones: {
      data: {
        availableTimeZones: [
          {
            name: '(UTC-06:00) America - Chicago',
            value: 'America/Chicago',
            __typename: 'TimeZone'
          },
          {
            name: '(UTC-05:00) America - New York',
            value: 'America/New_York',
            __typename: 'TimeZone'
          }
        ]
      }
    },
    ScheduleEngagementActivationStartDate: {
      data: {
        scheduleEngagementActivationStartDate: successMutationMock()
      }
    },
    // START "Change Commitment" specific
    GetExperiments: {
      data: {
        experiments: {
          __typename: 'Experiments'
        }
      }
    },
    SetChangeCommitment: {
      data: {
        changeEngagementCommitment: successMutationMock()
      }
    },
    // END "Change Commitment" specific
    // START "Schedule interview" specific
    GetEngagementScheduleInterviewOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          latestExternalInterview: {
            nodes: [],
            __typename: 'InterviewConnection'
          },
          newExternalInterview: {
            id: 'VjEtSW50ZXJ2aWV3LXZpcnR1YWxfZW5nYWdlbWVudF9pZD0yOTMzNjIma2luZD1leHRlcm5hbA',
            operations: {
              proposeInterviewTimeSlots: enabledOperationMock(),
              scheduleSingleCommitInterview: enabledOperationMock(),
              __typename: 'InterviewOperations'
            },
            __typename: 'Interview'
          },
          __typename: 'Engagement'
        }
      }
    },
    GetScheduleInterviewData: getScheduleInterviewDataResponse(),
    GetInterviewTimeSlotsForTimeZone:
      getInterviewTimeSlotsForTimeZoneResponse(),
    ScheduleSingleCommitInterview: {
      data: {
        scheduleSingleCommitInterview: successMutationMock()
      }
    }
    // END "Schedule interview" specific
  })
}

export default updateCandidateActionStubs
