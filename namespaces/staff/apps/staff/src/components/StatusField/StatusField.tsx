import React from 'react'
import { Typography } from '@toptal/picasso'
import { RoleStatus } from '@staff-portal/graphql/staff'

import { STAFF_STATUS_MAPPING } from '../../services'

export interface Props {
  cumulativeStatus: RoleStatus
}

export const StatusField = ({ cumulativeStatus }: Props) => {
  const color = STAFF_STATUS_MAPPING[cumulativeStatus].color
  const text = STAFF_STATUS_MAPPING[cumulativeStatus].text

  return (
    <Typography color={color} titleCase>
      {text}
    </Typography>
  )
}

export default StatusField
