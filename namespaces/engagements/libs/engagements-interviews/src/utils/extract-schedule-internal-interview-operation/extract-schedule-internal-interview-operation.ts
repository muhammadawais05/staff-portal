import { EngagementScheduleInternalInterviewFragment } from '../../data'
import { extractScheduleOperation } from '../extract-schedule-operation'
import { getEngagementInterview } from '../get-engagement-interview'

export const extractScheduleInternalInterviewOperation = ({
  latestInternalInterview,
  newInternalInterview
}: {
  latestInternalInterview?: EngagementScheduleInternalInterviewFragment | null
  newInternalInterview?: EngagementScheduleInternalInterviewFragment | null
}) => {
  if (!newInternalInterview) {
    return
  }

  const interview = getEngagementInterview({
    latestInterview: latestInternalInterview,
    newInterview: newInternalInterview
  })

  const operations = [
    interview?.operations.scheduleInternalSingleCommitInterview,
    interview?.operations.proposeInternalInterviewTimeSlots
  ]

  return extractScheduleOperation(operations)
}
