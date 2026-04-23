import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Typography } from '@toptal/picasso'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SchedulerForTransferFragment } from '../../data/scheduler-for-transfer-fragment'
import { MeetingFragment } from '../../../../data/meeting-fragment'
import { TransferMeetingDocument, useGetSchedulerAvailability } from './data'
import { REFRESH_MEETING_LIST } from '../../../../messages'
import { calculateTill } from '../../utils/calculate-till'

export type Props = {
  scheduler: SchedulerForTransferFragment
  hideModal: () => void
  onChangeOrganizer: () => void
} & Pick<MeetingFragment, 'id' | 'scheduledAt' | 'durationMinutes'>

const ConfirmChangeOrganizerModalContent = ({
  id: meetingId,
  scheduler,
  scheduledAt,
  durationMinutes,
  hideModal,
  onChangeOrganizer
}: Props) => {
  const { availableForMeeting, loading: meetingAvailabilityLoading } =
    useGetSchedulerAvailability({
      schedulerId: scheduler.id,
      from: scheduledAt,
      till: calculateTill(scheduledAt, durationMinutes)
    })

  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: TransferMeetingDocument,
    mutationResultOptions: {
      mutationResult: 'transferMeeting',
      successMessageEmitOptions: {
        type: REFRESH_MEETING_LIST
      },
      successNotificationMessage: 'Meeting was transferred.',
      onSuccessAction: hideModal
    }
  })

  const onSubmit = () => handleSubmit({ meetingId, schedulerId: scheduler.id })

  const TITLE = availableForMeeting
    ? 'Continue with Organizer Change'
    : 'Overlapping call. Continue with Organizer Change?'

  const DESCRIPTION = availableForMeeting
    ? `You are about to change the organizer of this meeting to ${scheduler.role.fullName}. After confirmation, new meeting invitations will be sent.`
    : `${scheduler.role.fullName} has an overlapping call at the scheduled time. Please confirm with them that they are available to conduct the call. After confirmation, new meeting details will be sent.`

  if (meetingAvailabilityLoading) {
    return <ModalSuspender />
  }

  return (
    <ModalForm title={TITLE} onSubmit={onSubmit}>
      <Modal.Content>
        <Typography color='dark-grey' size='medium'>
          {DESCRIPTION}
        </Typography>
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          No, Cancel Change
        </Button>

        <Button
          variant='secondary'
          disabled={loading}
          onClick={onChangeOrganizer}
          data-testid='pick-another-organizer-button'
        >
          Pick Another Organizer
        </Button>

        <Form.SubmitButton
          variant='positive'
          data-testid='change-meeting-organizer-submit-button'
        >
          Yes, Change Organizer
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ConfirmChangeOrganizerModalContent
