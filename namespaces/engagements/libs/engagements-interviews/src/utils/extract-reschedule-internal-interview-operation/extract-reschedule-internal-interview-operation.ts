import { EngagementRescheduleInternalInterviewFragment } from '../../data'
import { extractScheduleOperation } from '../extract-schedule-operation'
import { getEngagementInterview } from '../get-engagement-interview'

export const extractRescheduleInternalInterviewOperation = ({
  latestInternalInterview,
  newInternalInterview
}: {
  latestInternalInterview?: EngagementRescheduleInternalInterviewFragment | null
  newInternalInterview?: EngagementRescheduleInternalInterviewFragment | null
}) => {
  if (!newInternalInterview) {
    return
  }

  const interview = getEngagementInterview({
    latestInterview: latestInternalInterview,
    newInterview: newInternalInterview
  })

  const operations = [
    interview?.operations.clearAndRescheduleInternalSingleCommitInterview,
    interview?.operations.clearAndChangeInternalInterviewProposedTimeSlots
  ]

  return extractScheduleOperation(operations)
}
