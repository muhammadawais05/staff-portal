import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import BecomeMeetingOrganizerModals from '../BecomeMeetingOrganizerModals'

export type Props = {
  operation: OperationType
} & Pick<
  MeetingFragment,
  'id' | 'organizer' | 'scheduledAt' | 'durationMinutes'
>

const BecomeMeetingOrganizerButton = ({
  id: meetingId,
  organizer,
  scheduledAt,
  durationMinutes,
  operation
}: Props) => {
  const { showModal } = useModal(BecomeMeetingOrganizerModals, {
    scheduledAt,
    durationMinutes,
    id: meetingId,
    organizer
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          onClick={showModal}
          disabled={disabled}
          data-testid='become-meeting-organizer-button'
        >
          Assign self as organizer
        </Button>
      )}
    />
  )
}

export default BecomeMeetingOrganizerButton
