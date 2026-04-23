import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { useNotifications } from '@staff-portal/error-handling'
import { FormCancelButton } from '@staff-portal/forms'
import { RejectSpecializationApplicationInput } from '@staff-portal/graphql/staff'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Alert, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'

import { TALENT_UPDATED } from '../../messages'
import RejectSpecializationApplicationFormContent from '../RejectSpecializationApplicationFormContent'
import {
  RejectSpecializationApplicationDocument,
  RejectSpecializationApplicationMutation
} from './data/reject-specialization-application'

const getSuccessMessage = (
  talentCanBeRejected: boolean,
  specializationTitle?: string
) =>
  talentCanBeRejected
    ? 'The Applicant was successfully rejected.'
    : `The Application for the ${specializationTitle} specialization was successfully rejected.`

export type RejectApplicationSpecializationFormValues = Pick<
  RejectSpecializationApplicationInput,
  | 'rejectionReason'
  | 'comment'
  | 'eligibleForRestoration'
  | 'reapplicationDate'
  | 'cancelMeetings'
>

const INITIAL_VALUES = {
  eligibleForRestoration: true,
  cancelMeetings: true
}

interface Props {
  talentId: string
  talentName?: string
  talentCanBeRejected: boolean
  specializationApplicationId: string
  specializationTitle?: string
  screeningNotesPending: boolean
  cancelableMeetings?: { subject: string }[]
  hideModal: () => void
}

const RejectSpecializationApplicationModalContent = ({
  talentId,
  talentName,
  talentCanBeRejected,
  specializationApplicationId,
  specializationTitle,
  screeningNotesPending,
  cancelableMeetings,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: specializationApplicationId
  })

  const { handleSubmit } = useModalFormChangeHandler({
    errorNotificationMessage: 'Unable to reject specialization application.',
    mutationDocument: RejectSpecializationApplicationDocument,
    mutationResultOptions: {
      successNotificationMessage: getSuccessMessage(
        talentCanBeRejected,
        specializationTitle
      ),
      onSuccessAction: (
        mutationResult: RejectSpecializationApplicationMutation['rejectSpecializationApplication']
      ) => {
        hideModal()

        if (!mutationResult?.success) {
          showError('Failed to reject specialization application.')

          return
        }

        emitMessage(TALENT_UPDATED, { talentId })

        if (mutationResult.nextActionPerformable) {
          showSendEmailModal({
            preselectedEmailTemplateId: mutationResult.emailTemplate?.id,
            nodeId: specializationApplicationId
          })
        }
      }
    }
  })

  const onSubmit = ({
    comment,
    ...values
  }: RejectApplicationSpecializationFormValues) =>
    handleSubmit({
      ...values,
      comment: comment || '',
      specializationApplicationId
    })

  return (
    <ModalForm
      title='Reject Application'
      onSubmit={onSubmit}
      initialValues={INITIAL_VALUES}
    >
      <Modal.Content>
        {!talentCanBeRejected && (
          <Container bottom='medium'>
            <Typography size='medium' data-testid='introductory-text-part-1'>
              {talentName} has applied for the {specializationTitle}{' '}
              specialization. Do you really want to reject this application?
            </Typography>
            <Container top='medium' data-testid='introductory-text-part-2'>
              <Typography size='medium'>
                Rejecting the {specializationTitle} specialization application
                will not change the talent's active status. However, the talent
                will not be able to apply for this or any other specialization
                for 1 month.
              </Typography>
            </Container>
          </Container>
        )}

        <RejectSpecializationApplicationFormContent
          talentCanBeRejected={talentCanBeRejected}
          cancelableMeetings={cancelableMeetings}
        />

        {screeningNotesPending && talentCanBeRejected && (
          <Container top='medium' data-testid='no-screening-notes-warning'>
            <Alert variant='yellow'>
              There is no screening note attached to this profile. If you
              proceed with the rejection, you will not be able to log a
              screening note.
            </Alert>
          </Container>
        )}
      </Modal.Content>

      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />

        <Form.SubmitButton variant='negative' data-testid='reject-application'>
          Reject Application
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default RejectSpecializationApplicationModalContent
