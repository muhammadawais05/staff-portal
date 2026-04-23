import React from 'react'
import {
  Tooltip,
  Container,
  QuestionMark16,
  TypographyOverflow
} from '@toptal/picasso'
import {
  DEFAULT_FULL_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'

import { SystemInformationFragment } from '../../data'
import LastLoginTooltip from '../LastLoginTooltip'

interface Props {
  lastLoginDetails: SystemInformationFragment['representatives']['nodes'][0]
  timeZone?: string
}

const LastLogin = ({ lastLoginDetails, timeZone }: Props) => {
  const date = parseAndFormatDate(lastLoginDetails.currentSignInAt, {
    dateFormat: DEFAULT_FULL_DATE_FORMAT,
    timeZone
  })

  return (
    <Container flex>
      <TypographyOverflow size='medium'>{date}</TypographyOverflow>
      <Tooltip
        content={<LastLoginTooltip lastLoginDetails={lastLoginDetails} />}
      >
        <Container inline as='span' flex alignItems='center' left='xsmall'>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default LastLogin
