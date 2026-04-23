import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Button, Modal, Typography } from '@toptal/picasso'
import { ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SchedulerForBecomeOrganizerFragment } from '../BecomeMeetingOrganizerModalsSelectContent/data/get-possible-schedulers-for-become-organizer'
import { MeetingFragment } from '../../../../data/meeting-fragment'
import { BecomeMeetingOrganizerDocument } from './data/become-meeting-organizer'
import { REFRESH_MEETING_LIST } from '../../../../messages'
import { useGetSchedulerAvailability } from '../ConfirmChangeOrganizerModalContent/data'
import { calculateTill } from '../../utils/calculate-till'

export type Props = {
  hideModal: () => void
  onChangeOrganizer: () => void
  scheduler: SchedulerForBecomeOrganizerFragment
} & Pick<MeetingFragment, 'id' | 'scheduledAt' | 'durationMinutes'>

const BecomeMeetingOrganizerModalsConfirmContent = ({
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
    mutationDocument: BecomeMeetingOrganizerDocument,
    mutationResultOptions: {
      isFormSubmit: true,
      mutationResult: 'becomeMeetingOrganizer',
      successMessageEmitOptions: {
        type: REFRESH_MEETING_LIST
      },
      successNotificationMessage: 'You are now the organizer of this meeting.',
      onSuccessAction: hideModal
    }
  })

  const onSubmit = () => handleSubmit({ meetingId, schedulerId: scheduler.id })

  const TITLE = availableForMeeting
    ? 'Continue with Organizer Change'
    : 'Overlapping call. Continue with Organizer Change?'

  const DESCRIPTION = availableForMeeting
    ? `You are about to change the organizer of this meeting to ${scheduler.role.fullName}. After confirmation, new meeting invitations will be sent.`
    : 'You have an overlapping call at the scheduled time. Please confirm that you will be available to conduct the call. After confirmation, new meeting details will be sent.'

  if (meetingAvailabilityLoading) {
    return <ModalSuspender />
  }

  return (
    <ModalForm onSubmit={onSubmit} title={TITLE}>
      <Modal.Content>
        <Typography size='medium'>{DESCRIPTION}</Typography>
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
          loading={loading}
          data-testid='become-meeting-organizer-submit-button'
        >
          Yes, Change Organizer
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default BecomeMeetingOrganizerModalsConfirmContent
