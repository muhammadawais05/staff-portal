import React from 'react'
import { ArrowLongDown16 } from '@toptal/picasso/Icon'
import { Transitions } from '@toptal/picasso/utils'

import { SortOrder } from '../../types'

interface Props {
  sortOrder: string
}

const SortIcon = ({ sortOrder }: Props) => {
  return (
    <Transitions.Rotate180 on={sortOrder === SortOrder.ASC}>
      <ArrowLongDown16 />
    </Transitions.Rotate180>
  )
}

export default SortIcon
