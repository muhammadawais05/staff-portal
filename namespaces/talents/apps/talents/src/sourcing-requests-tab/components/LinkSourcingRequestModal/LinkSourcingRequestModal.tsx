import React from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Container, Button } from '@toptal/picasso'
import { Form, SubmissionErrors, FormApi } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import JobWithSourcingRequestInput from '../JobWithSourcingRequestInput'
import { useLinkSourcingRequest } from './data/link-sourcing-request'
import { useGetTalentLinkSourcingRequest } from '../LinkSourcingRequestButton/data/get-talent-link-sourcing-request'

interface LinkSourcingRequestForm {
  jobId: string
}

interface LinkSourcingRequestModalProps {
  talentId: string
  onLink: () => void
  hideModal: () => void
}

const LinkSourcingRequestModal = ({
  talentId,
  onLink,
  hideModal
}: LinkSourcingRequestModalProps) => {
  const { showError } = useNotifications()
  const { linkSourcingRequest } = useLinkSourcingRequest(talentId, {
    onError: () => showError('Unable to link Sourcing Request.')
  })

  const { talentFullName, loading } = useGetTalentLinkSourcingRequest(
    talentId,
    {
      onError: () => ''
    }
  )

  const { handleMutationResult } = useHandleMutationResult()

  const handleSubmit = async (
    { jobId }: LinkSourcingRequestForm,
    _: FormApi<LinkSourcingRequestForm>,
    setSubmissionErrors: ((errors?: SubmissionErrors) => void) | undefined
  ) => {
    const { data } = await linkSourcingRequest(talentId, jobId)

    const mutationErrors = handleMutationResult({
      mutationResult: data?.linkSourcingRequest,
      successNotificationMessage: 'Talent linked with Sourcing Request.',
      returnAllErrors: true,
      onSuccessAction: () => {
        onLink()
        hideModal()
      }
    })

    if (mutationErrors) {
      const { validationErrors } = mutationErrors

      if (validationErrors) {
        setSubmissionErrors?.({ jobId: validationErrors.jobId })
      }
    }
  }

  return (
    <Modal
      onClose={hideModal}
      size='small'
      open
      data-testid='delete-rating-modal'
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'linkSourcingRequest'
      }}
    >
      {loading ? (
        <ModalSuspender />
      ) : (
        <ModalForm<LinkSourcingRequestForm>
          onSubmit={handleSubmit}
          title={`Link ${talentFullName} to New Sourcing Request`}
        >
          <Modal.Content>
            <Container bottom='medium'>
              <JobWithSourcingRequestInput />
            </Container>
          </Modal.Content>
          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton variant='primary'>Link</Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default LinkSourcingRequestModal
