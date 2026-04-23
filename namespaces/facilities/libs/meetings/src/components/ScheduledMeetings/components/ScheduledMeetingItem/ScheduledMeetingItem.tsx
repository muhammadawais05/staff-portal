import React from 'react'

import MeetingHeader from '../../../MeetingHeader'
import { MeetingFragment } from '../../../../data/meeting-fragment'
import MeetingItemWithKnownAttendeeFields from '../../../MeetingItemWithKnownAttendeeFields'

interface Props {
  meeting: MeetingFragment
}

// This component supposed to be used at different places of the application
const ScheduledMeetingItem = ({ meeting }: Props) => {
  return <>
    <MeetingHeader size='small' meeting={meeting} />
    <MeetingItemWithKnownAttendeeFields isOrganizer meeting={meeting} />
  </>
}

export default ScheduledMeetingItem
