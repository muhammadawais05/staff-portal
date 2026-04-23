import { EngagementScheduleInterviewFragment } from '../../data'
import { extractScheduleOperation } from '../extract-schedule-operation'
import { getEngagementAdditionalInterview } from '../get-engagement-additional-interview'
import { getEngagementInterview } from '../get-engagement-interview'

export const extractScheduleInterviewOperation = ({
  latestExternalInterview,
  newExternalInterview,
  additionalInterview
}: {
  latestExternalInterview?: EngagementScheduleInterviewFragment | null
  newExternalInterview?: EngagementScheduleInterviewFragment | null
  additionalInterview?: boolean
}) => {
  if (!newExternalInterview) {
    return
  }

  const options = {
    latestInterview: latestExternalInterview,
    newInterview: newExternalInterview
  }

  const interview = additionalInterview
    ? getEngagementAdditionalInterview(options)
    : getEngagementInterview(options)

  const operations = [
    interview?.operations.scheduleSingleCommitInterview,
    interview?.operations.proposeInterviewTimeSlots
  ]

  return extractScheduleOperation(operations)
}
