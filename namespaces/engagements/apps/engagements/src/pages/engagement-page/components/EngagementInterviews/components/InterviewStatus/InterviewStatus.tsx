import React from 'react'
import { InterviewCumulativeStatus } from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'
import {
  getInterviewVerboseStatus,
  getInterviewWarningColor
} from '@staff-portal/engagements-interviews'

interface Props {
  interview: {
    cumulativeStatus: InterviewCumulativeStatus
    warningLevel: string
  }
  talentType?: string
}

const InterviewStatus = ({
  interview: { cumulativeStatus, warningLevel },
  talentType
}: Props) => {
  const statusText = getInterviewVerboseStatus({
    interviewStatus: cumulativeStatus,
    talentType
  })
  const statusColor = getInterviewWarningColor(warningLevel)

  return (
    <ColoredStatus
      status={statusText}
      color={statusColor}
      data-testid='InterviewStatus'
    />
  )
}

export default InterviewStatus
