import { Tooltip, Typography } from '@toptal/picasso'
import React from 'react'
import { ReferredRoleStatusCategory } from '@staff-portal/graphql/staff'

import { REFERRAL_STATUS_COLOR_MAPPING } from '../../../../constants'

interface Props {
  statusText: string
  statusCategory: ReferredRoleStatusCategory
  statusTooltip?: string | null
}

const ReferralStatus = ({
  statusText,
  statusCategory,
  statusTooltip = ''
}: Props) => {
  const color = REFERRAL_STATUS_COLOR_MAPPING[statusCategory]

  return (
    <Tooltip
      interactive
      disableListeners={!statusTooltip}
      content={statusTooltip}
    >
      <Typography as='span' color={color} weight='semibold'>
        {statusText}
      </Typography>
    </Tooltip>
  )
}

export default ReferralStatus
