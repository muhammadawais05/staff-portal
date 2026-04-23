import { UpdateClientLikelihoodToCloseInput } from '@staff-portal/graphql/staff'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { Button } from '@toptal/picasso'
import React from 'react'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SELECTABLE_LIKELIHOODS } from '../../config'
import { SetUpdateClientLikelihoodToCloseDocument } from '../../../../data/set-update-client-likelihood-to-close.staff.gql.types'

interface Props {
  hideModal: () => void
  clientId: string
  likelihoodToClose?: number | null
}

export const TITLE = 'Update Likelihood to close'

export const LikelihoodToCloseForm = ({
  hideModal,
  likelihoodToClose,
  clientId
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: SetUpdateClientLikelihoodToCloseDocument,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage:
        'The Likelihood to close was successfully updated.'
    }
  })

  return (
    <ModalForm<UpdateClientLikelihoodToCloseInput>
      data-testid='LikelihoodToCloseModal'
      onSubmit={handleSubmit}
      title={TITLE}
      initialValues={{
        clientId,
        likelihoodToClose
      }}
    >
      <Modal.Content>
        <Form.Select
          enableReset
          label='Likelihood to close'
          name='likelihoodToClose'
          width='full'
          options={SELECTABLE_LIKELIHOODS}
          data-testid='LikelihoodToCloseModal-select'
        />
        <Form.Input
          label='Comment'
          name='comment'
          width='full'
          multiline
          rows={4}
          data-testid='LikelihoodToCloseModal-comment'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='LikelihoodToCloseModal-confirm'
        >
          Confirm
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}
