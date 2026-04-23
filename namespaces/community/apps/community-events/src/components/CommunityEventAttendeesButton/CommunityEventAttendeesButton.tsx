import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import pluralize from 'pluralize'

import CommunityEventAttendeesModal from './CommunityEventAttendeesModal'

interface Props {
  communityEventId: string
  totalAttendees?: number
}

const CommunityEventAttendeesButton = ({
  communityEventId,
  totalAttendees = 0
}: Props) => {
  const { showModal } = useModal(CommunityEventAttendeesModal, {
    communityEventId,
    totalAttendees
  })

  return (
    <Button
      onClick={showModal}
      size='small'
      variant='secondary'
      disabled={totalAttendees === 0}
    >
      {totalAttendees} {pluralize('attendee', totalAttendees)}
    </Button>
  )
}

export default CommunityEventAttendeesButton
