import React, { useState, useMemo, useCallback } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import ChangeMeetingOrganizerModalContent from '../ChangeMeetingOrganizerModalContent'
import ConfirmChangeOrganizerModalContent from '../ConfirmChangeOrganizerModalContent'
import { SchedulerForTransferFragment } from '../../data/scheduler-for-transfer-fragment'

export type Props = {
  hideModal: () => void
} & Pick<
  MeetingFragment,
  'id' | 'organizer' | 'scheduledAt' | 'durationMinutes'
>

const ChangeMeetingOrganizerModals = ({
  id: meetingId,
  hideModal,
  scheduledAt,
  durationMinutes,
  organizer
}: Props) => {
  const [selectedScheduler, setSelectedScheduler] =
    useState<SchedulerForTransferFragment | null>(null)

  const onChangeOrganizer = useCallback(() => {
    setSelectedScheduler(null)
  }, [])

  const modalContent = useMemo(
    () =>
      selectedScheduler ? (
        <ConfirmChangeOrganizerModalContent
          id={meetingId}
          hideModal={hideModal}
          scheduledAt={scheduledAt}
          durationMinutes={durationMinutes}
          scheduler={selectedScheduler}
          onChangeOrganizer={onChangeOrganizer}
        />
      ) : (
        <ChangeMeetingOrganizerModalContent
          id={meetingId}
          hideModal={hideModal}
          organizer={organizer}
          setSelectedScheduler={setSelectedScheduler}
        />
      ),
    [
      selectedScheduler,
      onChangeOrganizer,
      durationMinutes,
      hideModal,
      organizer,
      scheduledAt,
      meetingId
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
        operationName: 'transferMeeting'
      }}
    >
      {modalContent}
    </Modal>
  )
}

export default ChangeMeetingOrganizerModals
