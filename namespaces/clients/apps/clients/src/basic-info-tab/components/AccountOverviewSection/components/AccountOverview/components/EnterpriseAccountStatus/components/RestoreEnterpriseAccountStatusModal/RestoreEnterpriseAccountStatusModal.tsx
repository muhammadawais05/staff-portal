import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { useRestoreEnterpriseStatus } from '../../hooks'

type Props = {
  hideModal: () => void
  clientId: string
}

const RestoreEnterpriseAccountStatusModal = ({
  hideModal,
  clientId
}: Props) => {
  const { handleSubmit, loading } = useRestoreEnterpriseStatus(hideModal)

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      data-testid='RestoreEnterpriseAccountStatusModal'
    >
      <Form
        initialValues={{
          clientId,
          comment: ''
        }}
        onSubmit={handleSubmit}
      >
        <Modal.Title>Restore Enterprise Account status?</Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Input
            label='Please specify a reason.'
            name='comment'
            required
            width='full'
            multiline
            rows={4}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='negative'>Restore</Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RestoreEnterpriseAccountStatusModal
