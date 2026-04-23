import React from 'react'
import { Typography } from '@toptal/picasso'
import { JobStatus } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

export const getDeleteJobIntroduction = (
  status: Maybe<JobStatus>,
  hasDeposit: boolean
) => {
  const isPendingClaim = status === JobStatus.PENDING_CLAIM
  const introduction = isPendingClaim
    ? 'This will cancel the job, no candidates will be placed, and the $500 deposit will not be charged.'
    : 'This will cancel the job and no candidates will be placed.'

  const note = hasDeposit
    ? 'The client’s deposit for this job will be kept for their future engagements unless the client asks for a refund.'
    : 'This job does not have a charged deposit.'

  return (
    <>
      <Typography size='medium'>{introduction}</Typography>
      {!isPendingClaim && <Typography size='medium'>{note}</Typography>}
    </>
  )
}
