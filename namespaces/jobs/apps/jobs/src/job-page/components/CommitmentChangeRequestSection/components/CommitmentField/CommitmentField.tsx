import React from 'react'
import { Typography } from '@toptal/picasso'
import { EngagementCommitmentEnum, Maybe } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { AVAILABILITY_COLOR_MAPPING } from '../../config'

export type Props = {
  commitment?: Maybe<EngagementCommitmentEnum>
  newExtraHoursEnabled?: Maybe<boolean>
}

const CommitmentField = ({ commitment, newExtraHoursEnabled }: Props) => {
  if (!commitment) {
    return null
  }

  const availabilityTitle = titleize(commitment, { separator: '-' })
  const availabilityText =
    commitment === EngagementCommitmentEnum.HOURLY
      ? availabilityTitle
      : `${availabilityTitle} with Extra Hours ${
          newExtraHoursEnabled ? 'Enabled' : 'Disabled'
        }`

  const availabilityColor = AVAILABILITY_COLOR_MAPPING[commitment]

  return (
    <Typography
      as='span'
      size='medium'
      color={availabilityColor}
      data-testid='CommitmentField'
    >
      {availabilityText}
    </Typography>
  )
}

export default CommitmentField
