import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import TalentOnlineTestsScoreTooltip from '../TalentOnlineTestsScoreTooltip'

export type Props = {
  canceledAt?: string | null
  pending: boolean
  testUrl?: string | null
  resultUrl?: string | null
  pureScore?: number | null
  maxScore?: number | null
  acceptThreshold?: number | null
  rejectThreshold?: number | null
}

const TalentOnlineTestsStatus = ({
  canceledAt,
  pending,
  testUrl,
  resultUrl,
  pureScore,
  maxScore,
  acceptThreshold,
  rejectThreshold
}: Props) => {
  let statusText = (
    <TalentOnlineTestsScoreTooltip
      acceptThreshold={acceptThreshold}
      rejectThreshold={rejectThreshold}
      pureScore={pureScore}
      maxScore={maxScore}
      resultUrl={resultUrl}
    />
  )

  if (canceledAt) {
    statusText = (
      <Typography color='grey' weight='semibold'>
        Canceled
      </Typography>
    )
  }

  if (pending) {
    statusText = (
      <Link href={testUrl as string}>
        <Typography color='inherit' weight='semibold'>
          Pending
        </Typography>
      </Link>
    )
  }

  return statusText
}

export default TalentOnlineTestsStatus
