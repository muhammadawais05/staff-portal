import React from 'react'
import { Button, Container, Plus16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import {
  isOperationEnabled,
  Operation,
  OperationType
} from '@staff-portal/operations'
import { NO_VALUE } from '@staff-portal/config'

import AddContactModal from './AddContactModal'
import ContactItem from './ContactItem'
import { GetJobContactsItemFragment } from '../data/get-job-client-contacts.staff.gql.types'

interface Props {
  jobId: string
  clientId: string
  contacts: GetJobContactsItemFragment[] | undefined
  createOperation?: OperationType
}

const EditContacts = ({
  jobId,
  clientId,
  contacts,
  createOperation
}: Props) => {
  const { showModal } = useModal(AddContactModal, {
    jobId,
    contacts,
    clientId
  })

  const showDash =
    contacts?.length === 0 && !isOperationEnabled(createOperation)

  return (
    <Container>
      {showDash && NO_VALUE}
      {contacts?.map(contact => (
        <ContactItem key={contact.node.id} jobId={jobId} contact={contact} />
      ))}

      <Operation
        operation={createOperation}
        render={disabled => (
          <Button.Action
            icon={<Plus16 />}
            onClick={showModal}
            disabled={disabled}
            data-testid='EditContacts-add-btn'
          >
            Add Job Contact
          </Button.Action>
        )}
      />
    </Container>
  )
}

export default EditContacts
