import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { CallbackRequestOverlappingMeeting } from '@staff-portal/graphql/staff'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { CallRequestType } from '../../enums'

const MEETING_TIME_FORMAT = 'h:mm a'

export interface Props {
  type?: string | null
  meetings: CallbackRequestOverlappingMeeting[]
}

const OverlappingMeetingsText = ({ meetings, type }: Props) => {
  const formatDate = useUserDateFormatter()

  if (type !== CallRequestType.SCHEDULED || meetings.length === 0) {
    return null
  }

  return (
    <Container bottom='medium' data-testid='overlapping-meetings-text'>
      <Typography weight='semibold' size='medium'>
        The time requested by the client overlaps with your existing meeting:
      </Typography>
      <ul>
        {meetings.map(({ name, scheduledAt }) => (
          <li key={name}>
            <Typography size='medium'>
              {name} starts at {formatDate(scheduledAt, MEETING_TIME_FORMAT)}
            </Typography>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default OverlappingMeetingsText
