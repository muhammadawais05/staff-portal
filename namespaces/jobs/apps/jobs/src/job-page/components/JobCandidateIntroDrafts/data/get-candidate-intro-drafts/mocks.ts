import {
  EngagementStatus,
  TalentJobIssue,
  TalentJobIssueMetricStatus
} from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { CandidateIntroDraftItem } from '../../types'
import { JobEngagementEdgeFragment } from '../job-engagement-edge-fragment'

export const createJobIssuesMock =
  (): JobEngagementEdgeFragment['jobIssues'] => ({
    status: TalentJobIssue.OK,
    failedMetrics: [
      {
        status: TalentJobIssueMetricStatus.OK,
        message: 'message',
        name: 'name'
      }
    ]
  })

export const createCandidateIntroDraftItem = (
  candidateIntroDraftItem: Partial<CandidateIntroDraftItem> = {}
): CandidateIntroDraftItem =>
  ({
    id: candidateIntroDraftItem?.id || '123',
    status: EngagementStatus.ACTIVE,
    cumulativeStatus: EngagementCumulativeStatus.ACTIVE,
    talent: {
      id: 'talent-id',
      type: 'developer',
      fullName: 'Domenic Koss',
      hourlyRate: '65.00',
      webResource: {
        text: 'text',
        url: 'https://staging.toptal.net/platform/staff/talents/1830142'
      }
    },
    jobIssues: createJobIssuesMock(),
    companyHourlyRate: '100.00',
    operations: {
      sendEngagementTalentIntroductionTestEmail: createOperationMock(),
      rejectDraftEngagement: createOperationMock(),
      approveDraftEngagement: createOperationMock(),
      cancelEngagementDraftInInterview: createOperationMock()
    },
    internalInterview: {
      id: '234',
      interviewTime: '2022-01-19T10:10:00+02:00'
    },
    newInternalInterview: {
      id: 'engagement-id',
      operations: {
        proposeInternalInterviewTimeSlots: createOperationMock(),
        clearAndChangeInternalInterviewProposedTimeSlots: createOperationMock()
      }
    },
    latestInternalInterview: {
      nodes: [
        {
          id: '123',
          operations: {
            proposeInternalInterviewTimeSlots: createOperationMock({
              messages: ['Last Internal Interview']
            }),
            clearAndChangeInternalInterviewProposedTimeSlots:
              createOperationMock()
          }
        }
      ]
    },
    viewIntroDraftV2: {
      enabled: true,
      messages: [],
      url: 'https://staging.toptal.net/platform/staff/engagements/pitches/new?engagement%5Bid%5D=273516'
    },
    ...candidateIntroDraftItem
  } as CandidateIntroDraftItem)
