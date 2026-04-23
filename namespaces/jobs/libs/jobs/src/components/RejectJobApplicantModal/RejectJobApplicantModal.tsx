import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JobApplicationRejectReason } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { isMaxLength } from '@staff-portal/forms'

import { JOB_UPDATED } from '../../messages'
import JobApplicationRejectReasonField from '../JobApplicationRejectReasonField'
import { RejectJobApplicantDocument } from './data/reject-job-applicant'

interface RejectJobApplicantForm {
  reason: JobApplicationRejectReason
  comment: string
}

export interface Props {
  jobId: string
  jobApplicationId: string
  hideModal: () => void
  operationVariables: GetLazyOperationVariables
}

const RejectJobApplicantModal = ({
  jobId,
  jobApplicationId,
  operationVariables,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [rejectJobApplicant, { loading }] = useMutation(
    RejectJobApplicantDocument,
    {
      onError: () => {
        showError('An error occurred, job application was not rejected.')
      }
    }
  )

  const handleSubmit = async (params: RejectJobApplicantForm) => {
    const { data } = await rejectJobApplicant({
      variables: {
        ...params,
        jobApplicationId
      }
    })

    return handleMutationResult({
      mutationResult: data?.rejectJobApplicant,
      successNotificationMessage:
        'You have successfully rejected job application.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  const title = 'Reject Job Application'

  return (
    <Modal
      withForm
      onClose={hideModal}
      //onOpen={onModalOpen}
      open
      size='small'
      data-testid='reject-job-application'
      operationVariables={operationVariables}
    >
      <Modal.Title>{title}</Modal.Title>

      <Form<RejectJobApplicantForm> onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              What is your reason for rejecting the job application?
            </Typography>
          </Container>
          <JobApplicationRejectReasonField />
          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            validate={isMaxLength}
            data-testid='job-application-reject-comment'
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='negative'>{title}</Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RejectJobApplicantModal
