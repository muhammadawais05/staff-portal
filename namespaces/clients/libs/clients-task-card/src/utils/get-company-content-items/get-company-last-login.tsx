import { Typography } from '@toptal/picasso'
import React from 'react'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'
import { joinTruthy } from '@staff-portal/utils'

import { ClientLastLoginFragment } from '../../data/client-last-login-fragment'

export const getCompanyLastLogin = (
  { nodes }: ClientLastLoginFragment['representatives'],
  timeZone?: string
) => {
  if (!nodes.length) {
    return
  }

  const { ipLocation, currentSignInAt, currentSignInIp } = nodes[0]

  if (!currentSignInAt) {
    return
  }

  const { cityName, countryName } = ipLocation || {}
  const showTooltip = currentSignInIp || cityName || countryName

  return {
    value: parseAndFormatDateTime(currentSignInAt, { timeZone }),
    tooltip: showTooltip && (
      <>
        {currentSignInIp && (
          <Typography>
            IP:{' '}
            <Typography as='span' weight='semibold'>
              {currentSignInIp}
            </Typography>
          </Typography>
        )}
        {(cityName || countryName) && (
          <Typography>
            Location:{' '}
            <Typography as='span' weight='semibold'>
              {joinTruthy([cityName, countryName])}
            </Typography>
          </Typography>
        )}
      </>
    )
  }
}
