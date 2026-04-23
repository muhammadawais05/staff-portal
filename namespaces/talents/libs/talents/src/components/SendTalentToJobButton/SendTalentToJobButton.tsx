import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { Button, Tooltip, Link as PicassoLink } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import { TalentFragment } from '../../data/get-talent'

export type Props = Pick<
  TalentFragment,
  'fullName' | 'suspended' | 'sendToJobUrl'
> & { target?: string }

const SendTalentToJobButton = ({
  fullName,
  suspended,
  sendToJobUrl,
  target
}: Props) => {
  if (!sendToJobUrl) {
    return null
  }

  const button = (
    <Button
      as={Link as typeof PicassoLink}
      size='small'
      target={target}
      href={sendToJobUrl}
      disabled={suspended}
      variant='positive'
      data-testid='send-to-job-button'
    >
      Send to Job
    </Button>
  )

  return suspended ? (
    <Tooltip
      placement='bottom'
      content={`${fullName} is suspended and cannot be sent to job.`}
    >
      <span>{button}</span>
    </Tooltip>
  ) : (
    button
  )
}

export default SendTalentToJobButton
