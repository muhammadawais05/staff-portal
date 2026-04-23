import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@staff-portal/error-handling'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCloneEmailTemplates, useGetEmailTemplateTargetRoles } from './data'

interface FormValues {
  originalTargetRole: string
  destinationTargetRole: string
}

interface Props {
  hideModal: () => void
}

const CloneEmailTemplatesModal = ({ hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [cloneEmailTemplates] = useCloneEmailTemplates()

  const {
    originalsOptions,
    destinationsOptions,
    loading: initialLoading
  } = useGetEmailTemplateTargetRoles({
    onError: () => showError('Failed to load target roles.')
  })

  const handleSubmit = async (values: FormValues) => {
    const { data } = await cloneEmailTemplates({ variables: { input: values } })

    return handleMutationResult({
      mutationResult: data?.cloneTargetRoleEmailTemplates,
      successNotificationMessage:
        'The email templates were successfully cloned.',
      onSuccessAction: () => hideModal()
    })
  }

  return (
    <Modal open size='small' onClose={hideModal}>
      {!initialLoading ? (
        <Form onSubmit={handleSubmit}>
          <Modal.Title>Clone Email Templates</Modal.Title>
          <Modal.Content>
            <Container bottom='medium'>
              <Typography size='medium' inline>
                This action will clone all public emails with their existing
                content from the original vertical to the destination vertical.
              </Typography>
            </Container>

            <Form.Select
              label='Original Vertical'
              name='originalTargetRole'
              placeholder='Please select a vertical'
              options={originalsOptions}
              width='full'
              required
              data-testid='email-templates-page-clone-modal-original-vertical-select'
            />

            <Form.Select
              label='Destination Vertical'
              name='destinationTargetRole'
              placeholder='Please select a vertical'
              options={destinationsOptions}
              width='full'
              required
              data-testid='email-templates-page-clone-modal-destination-vertical-select'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton>Clone Email Templates</Form.SubmitButton>
          </Modal.Actions>
        </Form>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default CloneEmailTemplatesModal
