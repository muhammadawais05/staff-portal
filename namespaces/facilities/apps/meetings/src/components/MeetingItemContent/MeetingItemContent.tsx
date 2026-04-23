import {
  MeetingItemWithKnownAttendeeFields,
  MeetingItemWithUnknownAttendeeFields,
  MeetingWithJobs
} from '@staff-portal/meetings'
import React from 'react'

import MeetingPendingJobs from '../MeetingPendingJobs'

interface Props {
  meeting: MeetingWithJobs
}

const MeetingItemContent = ({ meeting }: Props) => {
  if (meeting.attendee) {
    return (
      <>
        <MeetingItemWithKnownAttendeeFields
          isOrganizer={false}
          meeting={meeting}
        />
        <MeetingPendingJobs pendingJobs={meeting.pendingJobs} />
      </>
    )
  }

  return <MeetingItemWithUnknownAttendeeFields meeting={meeting} />
}

export default MeetingItemContent
