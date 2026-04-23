import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Container, Button, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { EditJobInvoiceNoteInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUpdateJobInvoiceNote } from './data'
import { JobListItemFragment } from '../JobListItem/data'

type FormValues = Pick<EditJobInvoiceNoteInput, 'invoiceNote'>

type Props = {
  job: JobListItemFragment
}

const UpdateInvoiceNoteModal = ({ job }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { showModal, hideModal, isOpen } = useModal()
  const jobId = job.id

  const [updateInvoiceNote, { loading }] = useUpdateJobInvoiceNote({
    onError: () => showError('Failed to update invoice note.')
  })

  const canEditInvoiceNote = isOperationEnabled(
    job.operations?.editJobInvoiceNote
  )

  const handleSubmit = async ({ invoiceNote }: FormValues) => {
    const { data: submitResult } = await updateInvoiceNote({
      variables: {
        input: {
          jobId,
          invoiceNote
        }
      }
    })

    return handleMutationResult({
      mutationResult: submitResult?.editJobInvoiceNote,
      successNotificationMessage: 'The invoice note was successfully updated.',
      onSuccessAction: () => {
        hideModal()
      }
    })
  }

  return (
    <>
      <Modal open={isOpen} onClose={hideModal}>
        <Form<FormValues>
          onSubmit={handleSubmit}
          initialValues={{ invoiceNote: job.invoiceNote || '' }}
        >
          <Modal.Title>Update Invoice Note</Modal.Title>
          <Modal.Content>
            <Container bottom={1}>
              <Container inline right={0.5}>
                <Typography inline weight='semibold' color='red'>
                  Warning!
                </Typography>
              </Container>
              <Container as='span'>
                This note will be seen by the client. Make sure you have
                provided a clear message.
              </Container>
            </Container>
            <Form.Input
              width='full'
              multiline
              rows={5}
              name='invoiceNote'
              placeholder='A note with additional details for the client'
              data-testid='update-invoice-note-field'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Button variant='positive' type='submit' loading={loading}>
              Update
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
      {canEditInvoiceNote && (
        <Container left='small'>
          <Button
            onClick={showModal}
            variant='secondary'
            size='small'
            data-testid='update-invoice-note-modal-edit-button'
          >
            Edit
          </Button>
        </Container>
      )}
    </>
  )
}

export default UpdateInvoiceNoteModal
