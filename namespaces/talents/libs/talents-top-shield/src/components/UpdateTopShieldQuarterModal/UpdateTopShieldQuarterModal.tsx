import React from 'react'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'

import { useUpdateTopShieldApplicationQuarter } from './hooks/use-update-top-shield-application-quarter'
import { TopShieldApplicationQuarterFragment } from '../../data/top-shield-application-quarter-fragment'
import {
  UpdateTopShieldQuarterFormFields,
  UpdateTopShieldQuarterForm
} from './components'

type Props = Pick<
  TopShieldApplicationQuarterFragment,
  'id' | 'startDate' | 'endDate' | 'paymentEndDate'
> & {
  hideModal: () => void
}

const UpdateTopShieldQuarterModal = ({
  id,
  startDate,
  endDate,
  paymentEndDate,
  hideModal
}: Props) => {
  const { handleSubmit } = useUpdateTopShieldApplicationQuarter({
    quarterId: id,
    hideModal
  })

  return (
    <Modal onClose={hideModal} size='small' open>
      <ModalForm<UpdateTopShieldQuarterForm>
        title='Update Quarter'
        onSubmit={handleSubmit}
        initialValues={{
          startDate: startDate ?? undefined,
          endDate: endDate ?? undefined,
          paymentEndDate: paymentEndDate ?? undefined
        }}
      >
        <Modal.Content>
          <UpdateTopShieldQuarterFormFields />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive' data-testid='button-complete'>
            Update
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default UpdateTopShieldQuarterModal
