import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { Tooltip, Button, Link as PicassoLink } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getRoleTypeText } from '@staff-portal/facilities'

export interface Props {
  type: string
  roleTitle?: string
  scheduleMeetingUrl?: string
}

const ScheduleMeetingOnBehalfButton = ({
  type,
  roleTitle,
  scheduleMeetingUrl
}: Props) => {
  const roleTypeTitle = getRoleTypeText(type, { roleTitle })

  const button = (
    <Button
      as={Link as typeof PicassoLink}
      size='small'
      variant='secondary'
      href={scheduleMeetingUrl}
      disabled={!scheduleMeetingUrl}
    >
      Schedule Meeting on Behalf of {roleTypeTitle}
    </Button>
  )

  return scheduleMeetingUrl ? (
    button
  ) : (
    <Tooltip
      placement='top'
      content='Please add booking page to be able to schedule meetings'
    >
      <span>{button}</span>
    </Tooltip>
  )
}

export default ScheduleMeetingOnBehalfButton
