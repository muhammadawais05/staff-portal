import React from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'

import { SystemInformationFragment } from '../../data'
import { getLocation } from '../../utils'

interface Props {
  lastLoginDetails: SystemInformationFragment['representatives']['nodes'][0]
}

const LastLoginTooltip = ({ lastLoginDetails }: Props) => {
  return (
    <>
      <Typography color='inherit'>
        IP:{' '}
        <Typography inline weight='semibold' color='inherit' as='span'>
          {lastLoginDetails.currentSignInIp}
        </Typography>
      </Typography>
      <TypographyOverflow color='inherit'>
        Location:{' '}
        <Typography
          inline
          weight='semibold'
          color='inherit'
          data-testid='LastLoginTooltip-location'
          as='span'
        >
          {getLocation(lastLoginDetails.ipLocationV2)}
        </Typography>
      </TypographyOverflow>
    </>
  )
}

export default LastLoginTooltip
