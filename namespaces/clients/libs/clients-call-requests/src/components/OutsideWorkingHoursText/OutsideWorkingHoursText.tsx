import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import { CallRequestType } from '../../enums'

export interface Props {
  type?: string | null
  inWorkingHours: boolean
}

const OutsideWorkingHoursText = ({ type, inWorkingHours }: Props) => {
  if (type !== CallRequestType.SCHEDULED || inWorkingHours) {
    return null
  }

  return (
    <Container bottom='medium'>
      <Typography weight='semibold' size='medium'>
        The requested start time is outside your working hours.
      </Typography>
    </Container>
  )
}

export default OutsideWorkingHoursText
