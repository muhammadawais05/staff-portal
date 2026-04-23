import React from 'react'
import { Typography } from '@toptal/picasso'
import { DetailedListValueViewOptions } from '@staff-portal/ui'

interface Props {
  workingNumber: number
  options?: DetailedListValueViewOptions
}

const WorkingStatusField = ({ workingNumber, options }: Props) => {
  const text = workingNumber === 0 ? 'Not working' : 'Working'
  const color = text === 'Working' ? 'green' : 'dark-grey'

  return (
    <Typography color={color} weight={options?.weight} size={options?.size}>
      {text}
    </Typography>
  )
}

export default WorkingStatusField
