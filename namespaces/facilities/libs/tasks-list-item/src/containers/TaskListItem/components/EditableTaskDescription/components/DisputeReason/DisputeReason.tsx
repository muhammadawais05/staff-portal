import { Typography } from '@toptal/picasso'
import React from 'react'
import { TaskStatus } from '@staff-portal/tasks'

interface Props {
  status: string
  disputeReason?: string | null
}

const DisputeReason = ({ status, disputeReason }: Props) => {
  if (status === TaskStatus.CANCELLED && disputeReason) {
    return (
      <>
        <Typography color='inherit' weight='semibold'>
          The dispute for this task was accepted.
        </Typography>
        <Typography color='inherit' weight='semibold'>
          Dispute reason:
        </Typography>
        <Typography color='inherit'>{disputeReason}</Typography>
      </>
    )
  }

  if (status === TaskStatus.CANCELLED) {
    return (
      <Typography color='inherit'>
        <Typography color='inherit' weight='semibold' as='strong'>
          The dispute for this task was accepted,
        </Typography>{' '}
        no dispute reason is available.
      </Typography>
    )
  }

  if (disputeReason) {
    return (
      <>
        <Typography color='inherit' weight='semibold'>
          Dispute reason:
        </Typography>
        <Typography color='inherit'>{disputeReason}</Typography>
      </>
    )
  }

  return (
    <Typography color='inherit'>
      <Typography color='inherit' weight='semibold' as='strong'>
        This is a disputed task,
      </Typography>{' '}
      but no dispute reason is available.
    </Typography>
  )
}

export default DisputeReason
