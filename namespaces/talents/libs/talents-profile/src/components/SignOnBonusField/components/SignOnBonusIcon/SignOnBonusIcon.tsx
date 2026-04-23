import React from 'react'
import { Container, Info16, Tooltip } from '@toptal/picasso'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'
import { TimeZone } from '@staff-portal/graphql/staff'

type Props = {
  date: string
  predictedTimeZone?: Partial<TimeZone> | null
}

const SignOnBonusIcon = ({ date, predictedTimeZone }: Props) => {
  const content = `At the talent time zone: ${parseAndFormatDateTime(date, {
    timeZone: predictedTimeZone?.value
  })} ${predictedTimeZone?.name}`

  return (
    <Tooltip content={content}>
      <Container top={0.3} flex alignItems='center' left='xsmall'>
        <Info16 color='dark-grey' />
      </Container>
    </Tooltip>
  )
}

export default SignOnBonusIcon
