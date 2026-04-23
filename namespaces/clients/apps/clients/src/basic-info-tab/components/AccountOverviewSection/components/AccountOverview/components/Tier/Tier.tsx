import React from 'react'
import { Typography } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { CLIENT_TIER_MAP } from '@staff-portal/clients'

import { CompanyOverviewFragment } from '../../../../data'

type Props = {
  value: CompanyOverviewFragment['tier']
}

const Tier = ({ value }: Props) => {
  return (
    <Typography size='medium'>
      {value ? CLIENT_TIER_MAP[value] : NO_VALUE}
    </Typography>
  )
}

export default Tier
