import { Engagement } from '@staff-portal/graphql/staff'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { getEngagementResponse } from '../engagement'

export const getJobCandidatesEngagementResponse = (
  engagement?: Partial<Engagement>
) => ({
  data: {
    node: {
      ...getEngagementResponse(engagement).data.node,
      newExternalInterview: {
        id: 'VjEtSW50ZXJ2aWV3LXZpcnR1YWxfZW5nYWdlbWVudF9pZD0yOTEyNTcma2luZD1leHRlcm5hbA',
        operations: {
          proposeInterviewTimeSlots: enabledOperationMock(),
          scheduleSingleCommitInterview: enabledOperationMock(),
          __typename: 'InterviewOperations',
          clearAndChangeInterviewProposedTimeSlots: hiddenOperationMock()
        },
        __typename: 'Interview'
      },
      latestInternalInterview: {
        nodes: [],
        __typename: 'InterviewConnection'
      },
      newInternalInterview: {
        id: 'VjEtSW50ZXJ2aWV3LXZpcnR1YWxfZW5nYWdlbWVudF9pZD0yOTEyNTcma2luZD1pbnRlcm5hbA',
        operations: {
          proposeInternalInterviewTimeSlots: hiddenOperationMock(),
          __typename: 'InterviewOperations',
          clearAndChangeInternalInterviewProposedTimeSlots:
            hiddenOperationMock()
        },
        __typename: 'Interview'
      }
    }
  }
})
