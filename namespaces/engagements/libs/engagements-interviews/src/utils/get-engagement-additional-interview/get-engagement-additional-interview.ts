import { isOperationHidden } from '@staff-portal/operations'

import { EngagementScheduleInterviewFragment } from '../../data'

type Props = {
  latestInterview?: EngagementScheduleInterviewFragment | null
  newInterview?: EngagementScheduleInterviewFragment | null
}

export const getEngagementAdditionalInterview = ({
  latestInterview,
  newInterview
}: Props) => {
  if (latestInterview) {
    const { proposeInterviewTimeSlots, scheduleSingleCommitInterview } =
      latestInterview.operations

    if (
      !isOperationHidden(proposeInterviewTimeSlots) ||
      !isOperationHidden(scheduleSingleCommitInterview)
    ) {
      return latestInterview
    }
  }

  return newInterview
}
