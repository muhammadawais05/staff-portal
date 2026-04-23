import React from 'react'
import { ArrowLongRight16, Typography, Container } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { WebResourceLink } from '@staff-portal/ui'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import MeetingAttendeeLogModal from '../MeetingAttendeeLogModal'
import ViewAttendeeLogButton from '../ViewAttendeeLogButton'
interface Props {
  meetingWith: MeetingFragment['attendee' | 'organizer']
  conferenceLink: MeetingFragment['conferenceLink']
}

const MeetingWithField = ({ meetingWith, conferenceLink }: Props) => {
  const { showModal } = useModal(MeetingAttendeeLogModal, {
    conferenceLink
  })

  if (!meetingWith) {
    return null
  }

  return (
    <Container flex justifyContent='space-between' alignItems='center'>
      <Typography size='medium' weight='semibold'>
        {'client' in meetingWith && (
          <>
            <WebResourceLink link={meetingWith.client.webResource} />{' '}
            <ArrowLongRight16 />{' '}
          </>
        )}
        <WebResourceLink link={meetingWith.webResource} />
      </Typography>

      {conferenceLink?.url && (
        <ViewAttendeeLogButton
          onClick={showModal}
          meetingUrl={conferenceLink.url}
        />
      )}
    </Container>
  )
}

export default MeetingWithField
