import { Typography } from '@toptal/picasso'
import React from 'react'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { getStatusColor } from '@staff-portal/talents'

export interface Props {
  stepTitle: string
  testName?: string
  pureScore: number
  maxScore?: number | null
  finishedAt?: string | null
  rejectThreshold?: number
  acceptThreshold?: number
}

const CompletedOnlineTest = ({
  stepTitle,
  testName,
  finishedAt,
  pureScore,
  maxScore,
  rejectThreshold,
  acceptThreshold
}: Props) => {
  const formatDate = useUserDateFormatter()
  const formattedDate = formatDate(finishedAt)
  const color = getStatusColor({
    pureScore,
    rejectThreshold: rejectThreshold || 0,
    acceptThreshold: acceptThreshold || 0
  })

  return (
    <>
      Are you sure you want to approve the {stepTitle} step? The corresponding
      test, "{testName}" was completed by the talent on {formattedDate} with a
      result of{' '}
      <Typography
        as='span'
        color={color}
        weight='semibold'
        data-testid={`online-test-score-${color}`}
      >
        {pureScore}/{maxScore}
      </Typography>{' '}
      against the fail threshold of {rejectThreshold}/{maxScore} and the pass
      threshold of {acceptThreshold}/{maxScore}.
    </>
  )
}

export default CompletedOnlineTest
