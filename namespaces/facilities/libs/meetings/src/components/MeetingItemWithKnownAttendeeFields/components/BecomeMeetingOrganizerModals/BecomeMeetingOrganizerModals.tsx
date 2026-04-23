import React, { useState, useMemo, useCallback } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { SchedulerForBecomeOrganizerFragment } from '../BecomeMeetingOrganizerModalsSelectContent/data/get-possible-schedulers-for-become-organizer'
import { MeetingFragment } from '../../../../data/meeting-fragment'
import BecomeMeetingOrganizerModalsSelectContent from '../BecomeMeetingOrganizerModalsSelectContent'
import BecomeMeetingOrganizerModalsConfirmContent from '../BecomeMeetingOrganizerModalsConfirmContent'

export type Props = {
  hideModal: () => void
} & Pick<
  MeetingFragment,
  'id' | 'organizer' | 'scheduledAt' | 'durationMinutes'
>

const BecomeMeetingOrganizerModals = ({
  id: meetingId,
  hideModal,
  organizer,
  scheduledAt,
  durationMinutes
}: Props) => {
  const [selectedScheduler, setSelectedScheduler] =
    useState<SchedulerForBecomeOrganizerFragment | null>(null)

  const onChangeOrganizer = useCallback(() => {
    setSelectedScheduler(null)
  }, [])

  const modalContent = useMemo(
    () =>
      selectedScheduler ? (
        <BecomeMeetingOrganizerModalsConfirmContent
          id={meetingId}
          scheduledAt={scheduledAt}
          durationMinutes={durationMinutes}
          hideModal={hideModal}
          scheduler={selectedScheduler}
          onChangeOrganizer={onChangeOrganizer}
        />
      ) : (
        <BecomeMeetingOrganizerModalsSelectContent
          id={meetingId}
          scheduledAt={scheduledAt}
          durationMinutes={durationMinutes}
          hideModal={hideModal}
          organizer={organizer}
          setSelectedScheduler={setSelectedScheduler}
        />
      ),
    [
      selectedScheduler,
      onChangeOrganizer,
      meetingId,
      hideModal,
      organizer,
      durationMinutes,
      scheduledAt
    ]
  )

  return (
    <Modal
      open
      onClose={hideModal}
      size={selectedScheduler ? 'medium' : 'small'}
      operationVariables={{
        nodeId: meetingId,
        nodeType: NodeType.MEETING,
        operationName: 'becomeMeetingOrganizer'
      }}
    >
      {modalContent}
    </Modal>
  )
}

export default BecomeMeetingOrganizerModals
