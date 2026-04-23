import React from 'react'
import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'
import { ErrorViewLayout } from '@staff-portal/error-handling'

import { NO_MEETING_MESSAGES } from './constants'
import MeetingIcon from './components/MeetingIcon'

export interface Props {
  category: MeetingPeriodEnum
}

const NoMeetingsMessage = ({ category }: Props) => {
  const message = NO_MEETING_MESSAGES[category]

  return (
    <ErrorViewLayout
      data-testid='NoMeetingsMessage'
      icon={<MeetingIcon />}
      header={message}
      headerSize='large'
    />
  )
}

export default NoMeetingsMessage
