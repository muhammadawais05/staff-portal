import React, { useState } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  Modal,
  ModalForm,
  ModalComponentBaseProps
} from '@staff-portal/modals-service'
import { FormCancelButton } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateEmailContact } from './data/create-email-contact'
import UserAssociationAutocomplete, {
  AssociationAutocompleteUser
} from '../UserAssociationAutocomplete'
import { EMAIL_ASSOCIATED_WITH_USER } from '../../../../messages'

interface Props extends ModalComponentBaseProps {
  emailAddress: string
}

const AssociateUserModal = ({ emailAddress, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { createEmailContact, loading: createEmailContactLoading } =
    useCreateEmailContact({
      onError: error => {
        showError(error.message)
        hideModal()
      }
    })

  const [selectedUser, setSelectedUser] =
    useState<AssociationAutocompleteUser | null>(null)

  const handleSubmit = async () => {
    if (selectedUser) {
      const { data } = await createEmailContact(emailAddress, selectedUser)

      return handleMutationResult({
        mutationResult: data?.createEmailContact,
        successNotificationMessage: 'Email was associated.',
        onSuccessAction: () => {
          hideModal()
          emitMessage(EMAIL_ASSOCIATED_WITH_USER, { email: emailAddress })
        }
      })
    }
  }

  return (
    <Modal open onClose={hideModal} size='small'>
      <ModalForm title='Associate Email' onSubmit={handleSubmit}>
        <Modal.Content>
          <UserAssociationAutocomplete
            onChange={userSelected => setSelectedUser(userSelected)}
          />
        </Modal.Content>
        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton
            loading={createEmailContactLoading}
            disabled={!selectedUser}
            data-testid='select-button'
          >
            Select
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default AssociateUserModal
