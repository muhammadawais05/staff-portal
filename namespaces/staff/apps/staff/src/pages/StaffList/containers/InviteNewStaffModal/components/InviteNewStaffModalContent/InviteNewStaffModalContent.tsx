import { InviteStaffInput } from '@staff-portal/graphql/staff'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import {
  REFETCH_STAFF_LIST,
  TeamAutocompleteEdgeFragment,
  TeamsAutocompleteField
} from '@staff-portal/staff'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useCallback } from 'react'

import { InviteStaffDocument } from '../../data/invite-staff/invite-staff.staff.gql.types'
import adjustFormValues from '../../services/adjust-form-values/adjust-form-values'

export type FormValues = Pick<InviteStaffInput, 'email' | 'fullName'> & {
  teamIds?: TeamAutocompleteEdgeFragment[]
}

type Props = {
  hideModal: () => void
  title: string
}

const InviteNewStaffModalContent = ({ hideModal, title }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: InviteStaffDocument,
      mutationResultOptions: {
        successNotificationMessage: 'The Invitation was successfully sent.',
        successMessageEmitOptions: { type: REFETCH_STAFF_LIST },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    (formValues: FormValues) =>
      handleMutationSubmit(adjustFormValues(formValues)),
    [handleMutationSubmit]
  )

  return (
    <ModalForm<FormValues> title={title} onSubmit={handleSubmit}>
      <Modal.Content>
        <Form.Input name='email' label='Email' width='full' required />

        <Form.Input name='fullName' label='Full name' width='full' required />

        <Container top='small'>
          <TeamsAutocompleteField />
        </Container>
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>
          Send Invitation
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default InviteNewStaffModalContent
