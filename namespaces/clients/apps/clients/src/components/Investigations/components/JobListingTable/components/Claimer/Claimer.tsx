import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'

import { Job } from '../../../../types'

interface Props {
  claimer: Job['claimer']
}

const Claimer = ({ claimer }: Props) => {
  return claimer ? (
    <Link href={claimer.webResource.url || ''} data-testid='Claimer-link'>
      {claimer.fullName}
    </Link>
  ) : (
    <Typography data-testid='Claimer-text'>{NO_VALUE}</Typography>
  )
}

export default Claimer
