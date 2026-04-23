import { MeetingHeader, MeetingWithJobs } from '@staff-portal/meetings'
import { Container } from '@toptal/picasso'
import React from 'react'

import MeetingItemContent from '../../../../components/MeetingItemContent/MeetingItemContent'
interface Props {
  meeting: MeetingWithJobs
}

// This component supposed to be used for `Meetings` page.
// For usage at other places please take a look on `ScheduledMeetingItem`
const MeetingItem = ({ meeting }: Props) => {
  return (
    <Container data-testid='meeting'>
      <MeetingHeader size='medium' meeting={meeting} />

      <Container top='small'>
        <MeetingItemContent meeting={meeting} />
      </Container>
    </Container>
  )
}

export default MeetingItem
