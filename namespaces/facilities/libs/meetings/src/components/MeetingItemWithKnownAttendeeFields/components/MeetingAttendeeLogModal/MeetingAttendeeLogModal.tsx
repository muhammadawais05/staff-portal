import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import MeetingAttendeesContent from '../MeetingAttendeesContent'

export interface Props {
  hideModal: () => void
  conferenceLink: MeetingFragment['conferenceLink']
}

const MeetingAttendeeLogModal = ({ hideModal, conferenceLink }: Props) => {
  return (
    <Modal onClose={hideModal} open size='large'>
      <Modal.Title>Attendee Log</Modal.Title>
      <Modal.Content>
        <MeetingAttendeesContent conferenceLink={conferenceLink} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          variant='secondary'
          data-testid='attendees-cancel-button'
          onClick={hideModal}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default MeetingAttendeeLogModal
