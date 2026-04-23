import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal } from '@toptal/picasso'
import { FormCancelButton } from '@staff-portal/forms'

import { CreateHoldPaymentsActionsProps } from '../../types'

export const CreateHoldPaymentsActions = ({
  loading,
  onClick
}: CreateHoldPaymentsActionsProps) => {
  return (
    <Modal.Actions>
      <FormCancelButton onClick={onClick} />
      <Form.SubmitButton
        variant='positive'
        loading={loading}
        data-testid='create-hold-payments-actions-submit-button'
      >
        Hold Payments
      </Form.SubmitButton>
    </Modal.Actions>
  )
}
