import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import { SystemInformationFragment } from '../../data'

interface Props {
  referrer: SystemInformationFragment['referrer']
}

const Referrer = ({ referrer }: Props) => {
  return (
    <Typography weight='semibold' size='medium'>
      <Link href={referrer?.webResource.url || ''} data-testid='Referrer-link'>
        {referrer?.webResource.text}
      </Link>
    </Typography>
  )
}

export default Referrer
