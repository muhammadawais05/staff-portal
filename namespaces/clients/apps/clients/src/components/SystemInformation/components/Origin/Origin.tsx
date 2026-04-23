import React from 'react'
import { Typography } from '@toptal/picasso'
import { ApplicationInfoField } from '@staff-portal/facilities'

interface Props {
  clientId: string
}

const Origin = ({ clientId }: Props) => {
  return (
    <Typography weight='semibold' size='medium' as='span'>
      <ApplicationInfoField entityId={clientId} />
    </Typography>
  )
}

export default Origin
