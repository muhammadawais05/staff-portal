import { EngagementRescheduleInterviewFragment } from '../../data'
import { extractScheduleOperation } from '../extract-schedule-operation'
import { getEngagementInterview } from '../get-engagement-interview'

export const extractRescheduleInterviewOperation = ({
  latestExternalInterview,
  newExternalInterview
}: {
  latestExternalInterview?: EngagementRescheduleInterviewFragment | null
  newExternalInterview?: EngagementRescheduleInterviewFragment | null
}) => {
  if (!newExternalInterview) {
    return
  }

  const interview = getEngagementInterview({
    latestInterview: latestExternalInterview,
    newInterview: newExternalInterview
  })

  const operations = [
    interview?.operations.clearAndRescheduleSingleCommitInterview,
    interview?.operations.clearAndChangeInterviewProposedTimeSlots
  ]

  return extractScheduleOperation(operations)
}
