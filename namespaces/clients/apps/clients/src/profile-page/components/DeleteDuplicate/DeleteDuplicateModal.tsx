import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Button, Container } from '@toptal/picasso'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { useDeleteDuplicateSubmit } from './hooks'

export interface Props {
  companyId: string
  fullName: string
  hideModal: () => void
}

const DeleteDuplicateModal = ({
  companyId,
  fullName,
  hideModal
}: Props) => {
  const { loading: submitting, handleSubmit } = useDeleteDuplicateSubmit({
    companyId,
    hideModal
  })

  const modalTitle = `Delete Duplicate: ${fullName || ''}`
  const initialValues = { transferJobs: true }

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      data-testid='DeleteDuplicateModal'
    >
      <Modal.Title>{modalTitle}</Modal.Title>
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Input
            autoFocus
            required
            rows={4}
            width='full'
            name='originalClientUrl'
            label='Original company URL'
            data-testid='DeleteDuplicateModal-originalClientUrl'
            hint="This company won't be deleted"
          />
          <Container top='small' bottom='small'>
            <Form.Checkbox
              name='transferJobs'
              label='Transfer jobs'
              data-testid='DeleteDuplicateModal-transferJobs'
              hint="Jobs that aren't transferred will be deleted."
            />
          </Container>
          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            data-testid='DeleteDuplicateModal-comment'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal} disabled={submitting}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='DeleteDuplicateModal-submit'
          >
            Delete
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default DeleteDuplicateModal
