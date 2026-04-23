import React from 'react'
import { Typography, TypographyProps } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { TalentHealthStatusValue } from '@staff-portal/graphql/staff'

import { HEALTH_STATUS_MAPPING } from '../../constants'

interface Props {
  status?: TalentHealthStatusValue
  weight?: TypographyProps['weight']
}

const HealthStatusField = ({ status, weight }: Props) => {
  const color = status ? HEALTH_STATUS_MAPPING[status].color : 'inherit'
  const text = status ? HEALTH_STATUS_MAPPING[status].text : NO_VALUE

  return (
    <Typography
      size='medium'
      data-testid='health-status-field-current-health'
      color={color}
      weight={weight}
    >
      {text}
    </Typography>
  )
}

export default HealthStatusField
