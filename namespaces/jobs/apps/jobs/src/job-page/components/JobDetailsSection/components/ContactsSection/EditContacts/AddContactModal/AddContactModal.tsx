import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import React from 'react'
import Form from '@toptal/picasso-forms/Form'
import { NodeType } from '@staff-portal/graphql'

import useAddContactModal from '../hooks/use-add-contact'
import { GetJobContactsItemFragment } from '../../data/get-job-client-contacts.staff.gql.types'

interface Props {
  jobId: string
  clientId: string
  hideModal: () => void
  contacts: GetJobContactsItemFragment[] | undefined
}

const AddContactModal = ({ hideModal, jobId, contacts, clientId }: Props) => {
  const { handleSubmit, mutationLoading, representativesOptions } =
    useAddContactModal({ jobId, hideModal, contacts, clientId })

  const [addContact] = representativesOptions

  const formInitialValues = {
    representativeId: addContact.value
  }

  return (
    <Modal
      open
      withForm
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'createJobContactFromJob'
      }}
      data-testid='AddContactModal-root'
    >
      <Form onSubmit={handleSubmit} initialValues={formInitialValues}>
        <Modal.Title>Add Contact to the Job</Modal.Title>
        <Modal.Content>
          <Form.Select
            name='representativeId'
            width='full'
            label='Job Contact'
            autoFocus={true}
            options={representativesOptions}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            onClick={hideModal}
            disabled={mutationLoading}
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='AddContactModal-submit-button'
            disabled={mutationLoading}
          >
            Add Contact
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default AddContactModal
