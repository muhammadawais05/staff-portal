import React from 'react'
import { Typography, TypographyProps } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { TalentInfractionStatusValue } from '@staff-portal/graphql/staff'

import { INFRACTION_STATUS_MAPPING } from '../../constants'

interface Props {
  status?: TalentInfractionStatusValue
  weight?: TypographyProps['weight']
}

const TalentInfractionStatus = ({ status, weight }: Props) => {
  const color = status ? INFRACTION_STATUS_MAPPING[status].color : 'inherit'
  const text = status ? INFRACTION_STATUS_MAPPING[status].text : NO_VALUE

  return (
    <Typography size='medium' color={color} weight={weight}>
      {text}
    </Typography>
  )
}

export default TalentInfractionStatus
