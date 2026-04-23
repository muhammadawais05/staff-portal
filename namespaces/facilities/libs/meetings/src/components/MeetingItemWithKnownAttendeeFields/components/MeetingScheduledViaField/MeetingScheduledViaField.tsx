import { Container, Typography } from '@toptal/picasso'
import React from 'react'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import { getScheduledViaContent } from './utils/get-scheduled-via-content'
import ChangeMeetingOrganizerButton from '../ChangeMeetingOrganizerButton'
import BecomeMeetingOrganizerButton from '../BecomeMeetingOrganizerButton'

export interface Props {
  meeting: MeetingFragment
}

const MeetingScheduledViaField = ({
  meeting: {
    id,
    organizer,
    scheduledAt,
    durationMinutes,
    callbackRequest,
    masterBookingPage,
    currentScheduler,
    operations: {
      transferMeeting: transferMeetingOperation,
      becomeMeetingOrganizer: becomeMeetingOrganizerOperation
    }
  }
}: Props) => {
  return (
    <Container
      flex
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Typography noWrap weight='semibold' size='medium'>
        {getScheduledViaContent({
          callbackRequest,
          masterBookingPage,
          currentScheduler
        })}
      </Typography>
      <Container left='xsmall'>
        <ChangeMeetingOrganizerButton
          id={id}
          organizer={organizer}
          scheduledAt={scheduledAt}
          durationMinutes={durationMinutes}
          operation={transferMeetingOperation}
        />
        <BecomeMeetingOrganizerButton
          id={id}
          organizer={organizer}
          scheduledAt={scheduledAt}
          durationMinutes={durationMinutes}
          operation={becomeMeetingOrganizerOperation}
        />
      </Container>
    </Container>
  )
}

export default MeetingScheduledViaField
