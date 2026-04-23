import React from 'react'
import { Flash16, Calendar16 } from '@toptal/picasso'

import { CallRequestType } from '../../enums'

export interface Props {
  type?: string | null
}

const ClaimCallRequestModalIcon = ({ type }: Props) => {
  if (type === CallRequestType.SCHEDULED) {
    return <Calendar16 scale={4} color='green' />
  }

  if (type === CallRequestType.INSTANT) {
    return <Flash16 scale={4} color='red' />
  }

  return null
}

export default ClaimCallRequestModalIcon
