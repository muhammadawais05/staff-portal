import React from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { InviteCompanyRepresentativeInput } from '@staff-portal/graphql/staff'
import { ModalForm } from '@staff-portal/modals-service'

import { useSubmitInviteContact } from '../../hooks'

interface Props {
  clientId: string
  hideModal: () => void
}

const InviteContactContent = ({ clientId, hideModal }: Props) => {
  const { handleSubmit, loading } = useSubmitInviteContact()

  return (
    <ModalForm<InviteCompanyRepresentativeInput>
      title='Invite Contact'
      onSubmit={handleSubmit}
      initialValues={{
        clientId
      }}
    >
      <Modal.Content>
        <Form.Input required label='Email' width='full' name='email' />
        <Form.Input required label='Full Name' width='full' name='fullName' />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          disabled={loading}
          data-testid='invite-contact-modal-send-invitation'
        >
          Send Invitation
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default InviteContactContent
