import React from 'react'
import { Container, Tooltip, Typography } from '@toptal/picasso'
import { Info16 } from '@toptal/picasso/Icon'
import { NO_VALUE } from '@staff-portal/config'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'

const getLocationText = ({
  cityName,
  countryName
}: {
  cityName?: string | null
  countryName?: string | null
}) => {
  return cityName && countryName
    ? `${cityName}, ${countryName}`
    : cityName || countryName || NO_VALUE
}

interface Props {
  lastVisitedDate?: string | null
  currentSignInAt?: string | null
  currentSignInIp?: string | null
  ipLocation: {
    cityName?: string | null
    countryName?: string | null
  }
}

const LastVisitedField = ({
  lastVisitedDate,
  currentSignInAt,
  currentSignInIp,
  ipLocation
}: Props) => {
  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  return (
    <Container flex as='span' alignItems='center' inline>
      {userDateFormatter(lastVisitedDate) || NO_VALUE}
      <Tooltip
        content={
          <Typography>
            Last login:{' '}
            <Typography as='span' weight='semibold' color='inherit'>
              {userDateTimeFormatter(currentSignInAt) || NO_VALUE}
            </Typography>
            <br />
            Last login IP:{' '}
            <Typography as='span' weight='semibold' color='inherit'>
              {currentSignInIp || NO_VALUE}
            </Typography>
            <br />
            Last login location:{' '}
            <Typography as='span' weight='semibold' color='inherit'>
              {getLocationText(ipLocation)}
            </Typography>
          </Typography>
        }
      >
        <Container flex left='xsmall'>
          <Info16 data-testid='info-icon' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default LastVisitedField
