import React, { useMemo } from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { Operation, isOperationHidden } from '@staff-portal/operations'

import { MeetingFragment } from '../../data/meeting-fragment'
import MeetingScheduleField from '../MeetingScheduleField'
import MeetingStatusField from '../MeetingStatusField'
import MeetingAttendeeField from './components/MeetingAttendeeField'

interface Props {
  meeting: MeetingFragment
}

const MeetingItemWithUnknownAttendeeFields = ({ meeting }: Props) => {
  const meetingFields = useMemo(() => {
    const {
      id,
      attendeeName,
      attendeeEmail,
      scheduledAt,
      durationMinutes,
      status,
      outcome,
      comment,
      organizer,
      additionalInformation,
      operations: { assignMeetingAttendee: assignMeetingAttendeeOperation }
    } = meeting

    return [
      {
        label: 'Name',
        value: (
          <TypographyOverflow weight='semibold' size='medium'>
            {attendeeName ?? ''}
          </TypographyOverflow>
        ),
        hidden: !attendeeName
      },
      {
        label: 'Email',
        value: (
          <TypographyOverflow weight='semibold' size='medium'>
            {attendeeEmail ?? ''}
          </TypographyOverflow>
        ),
        hidden: !attendeeEmail
      },
      {
        label: 'Attendee',
        value: (
          <Operation operation={assignMeetingAttendeeOperation}>
            <MeetingAttendeeField meetingId={id} />
          </Operation>
        ),
        hidden: isOperationHidden(assignMeetingAttendeeOperation)
      },
      {
        label: 'Status',
        value: (
          <MeetingStatusField
            status={status}
            outcome={outcome}
            comment={comment}
            organizer={organizer}
          />
        ),
        hidden: false
      },
      {
        label: 'Schedule',
        value: (
          <MeetingScheduleField
            scheduledAt={scheduledAt}
            durationMinutes={durationMinutes}
          />
        ),
        hidden: false
      },
      {
        label: 'Additional Information',
        value: (
          <Typography weight='semibold' size='medium'>
            {additionalInformation}
          </Typography>
        ),
        hidden: !additionalInformation
      }
    ]
  }, [meeting])

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList items={meetingFields} />
  )
}

export default MeetingItemWithUnknownAttendeeFields
