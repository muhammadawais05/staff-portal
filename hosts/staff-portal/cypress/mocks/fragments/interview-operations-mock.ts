import { InterviewOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const interviewOperationMock = (
  operations?: Partial<InterviewOperations>
): WithTypename<InterviewOperations> => ({
  __typename: 'InterviewOperations',
  clearAndChangeInterviewProposedTimeSlots: hiddenOperationMock(),
  clearAndRescheduleSingleCommitInterview: hiddenOperationMock(),
  proposeInterviewTimeSlots: hiddenOperationMock(),
  updateInterviewGoogleCalendarEvent: hiddenOperationMock(),
  proposeInternalInterviewTimeSlots: hiddenOperationMock(),
  clearAndChangeInternalInterviewProposedTimeSlots: hiddenOperationMock(),
  clearAndRescheduleInternalSingleCommitInterview: hiddenOperationMock(),
  rateForClientInterview: hiddenOperationMock(),
  scheduleInternalSingleCommitInterview: hiddenOperationMock(),
  scheduleSingleCommitInterview: hiddenOperationMock(),
  ...operations
})
