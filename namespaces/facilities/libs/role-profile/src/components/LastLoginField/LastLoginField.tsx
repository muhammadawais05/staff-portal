import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { Container, Info16, Tooltip, Typography } from '@toptal/picasso'
import { joinTruthy } from '@staff-portal/utils'

export type Props = {
  dateTime: string
  ip?: string | null
  ipLocation: {
    cityName?: string | null
    countryName?: string | null
  }
}

const LastLoginField = ({
  dateTime,
  ip,
  ipLocation: { cityName, countryName }
}: Props) => {
  if (!dateTime) {
    return null
  }

  return (
    <Container
      flex
      as='span'
      alignItems='center'
      inline
      data-testid='last-login-field'
    >
      {dateTime}
      <Tooltip
        interactive
        content={
          <Typography>
            IP:{' '}
            <Typography as='span' weight='semibold' color='inherit'>
              {ip || NO_VALUE}
            </Typography>
            <br />
            Location:{' '}
            <Typography as='span' weight='semibold' color='inherit'>
              {joinTruthy([cityName, countryName])}
            </Typography>
          </Typography>
        }
      >
        <Container flex left='xsmall'>
          <Info16 />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default LastLoginField
