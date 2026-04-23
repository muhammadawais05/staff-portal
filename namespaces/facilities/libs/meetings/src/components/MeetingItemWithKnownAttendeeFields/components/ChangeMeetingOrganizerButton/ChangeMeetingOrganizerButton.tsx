import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import ChangeMeetingOrganizerModals from '../ChangeMeetingOrganizerModals'

export type Props = Pick<
  MeetingFragment,
  'id' | 'scheduledAt' | 'durationMinutes' | 'organizer'
> & {
  operation: OperationType
}

const ChangeMeetingOrganizerButton = ({
  id,
  organizer,
  scheduledAt,
  durationMinutes,
  operation
}: Props) => {
  const { showModal } = useModal(ChangeMeetingOrganizerModals, {
    id,
    organizer,
    scheduledAt,
    durationMinutes
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showModal}
          data-testid='meeting-change-organizer-button'
        >
          Change Organizer
        </Button>
      )}
    />
  )
}

export default ChangeMeetingOrganizerButton
