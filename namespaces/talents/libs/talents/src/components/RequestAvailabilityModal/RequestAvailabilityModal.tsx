import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NodeType } from '@staff-portal/graphql'

import { TALENT_UPDATED } from '../../messages'
import { AvailabilityRequestInitialJobData } from '../../types'
import { useCreateTalentAvailabilityRequest } from './data'
import RequestAvailabilityForm from '../RequestAvailabilityForm'

interface RequestAvailabilityFormValues {
  jobId: string
  comment?: string
  reasonForOverride?: string
  yourReasonToOverride?: string
}

export interface Props {
  talentId: string
  initialJobData?: AvailabilityRequestInitialJobData
  hideModal: () => void
}

const RequestAvailabilityModal = ({
  talentId,
  initialJobData,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { requestAvailability, loading } = useCreateTalentAvailabilityRequest({
    onError: () =>
      showError('An error occurred, The Availability Request was not created.')
  })

  const handleSubmit = async ({
    comment,
    jobId,
    reasonForOverride,
    yourReasonToOverride
  }: RequestAvailabilityFormValues) => {
    if (!jobId) {
      return handleMutationResult({
        mutationResult: {
          success: false,
          errors: [{ code: '', key: 'base', message: 'Job is not specified' }]
        }
      })
    }

    const { data } = await requestAvailability({
      talentId,
      jobId,
      comment,
      reasonForOverride: yourReasonToOverride ?? reasonForOverride
    })

    return handleMutationResult({
      mutationResult: data?.createTalentAvailabilityRequest,
      successNotificationMessage:
        'The Availability Request was successfully created.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return (
    <Modal
      withForm
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'createTalentAvailabilityRequest'
      }}
    >
      <ModalForm<RequestAvailabilityFormValues>
        onSubmit={handleSubmit}
        title='Talent Availability Request'
      >
        <Modal.Content>
          <Container bottom='small'>
            <Typography size='medium'>
              Select the company and specific job you would like to request
              talent availability for.
            </Typography>
          </Container>

          <RequestAvailabilityForm
            talentId={talentId}
            initialJobData={initialJobData}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>Send Request</Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default RequestAvailabilityModal
