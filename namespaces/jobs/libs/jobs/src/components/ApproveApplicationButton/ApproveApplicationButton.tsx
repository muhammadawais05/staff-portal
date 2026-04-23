// eslint-disable-next-line no-restricted-imports
import { Button, Link as PicassoLink } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { JobApplication } from '@staff-portal/graphql/staff'
import { WrapWithTooltip } from '@staff-portal/ui'

export type Props = {
  jobApplication: Pick<JobApplication, 'approveUrlTooltip' | 'approveUrl'>
  buttonText?: string
}

const ApproveApplicationButton = ({ jobApplication, buttonText }: Props) => {
  if (!jobApplication.approveUrl) {
    return null
  }

  const isTooltipEnabled = Boolean(jobApplication.approveUrlTooltip)

  return (
    <WrapWithTooltip
      interactive
      enableTooltip={isTooltipEnabled}
      content={jobApplication.approveUrlTooltip}
    >
      <span>
        <Button
          as={Link as typeof PicassoLink}
          data-testid='approve-link'
          size='small'
          variant='positive'
          href={jobApplication.approveUrl}
          disabled={isTooltipEnabled}
        >
          {buttonText || 'Approve'}
        </Button>
      </span>
    </WrapWithTooltip>
  )
}

export default ApproveApplicationButton
