import React from 'react'
import { TypographyOverflow, Container, SizeType } from '@toptal/picasso'

import MeetingActions from '../MeetingActions'
import { MeetingFragment } from '../../data/meeting-fragment'

interface Props {
  size: SizeType<'small' | 'medium'>
  meeting: MeetingFragment
}

const MeetingHeader = ({ size, meeting }: Props) => {
  return (
    <Container flex alignItems='center' justifyContent='space-between'>
      <TypographyOverflow size={size} variant='heading'>
        {meeting.subject}
      </TypographyOverflow>

      <MeetingActions meeting={meeting} />
    </Container>
  )
}

export default MeetingHeader
