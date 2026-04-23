import React from 'react'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'

import { TopShieldApplicationFragment } from '../../data'
import { CreateTopShieldQuarterFormFields } from './components'
import { useCreateTopShieldApplicationQuarter } from './hooks/use-create-top-shield-application-quarter'

type Props = Pick<TopShieldApplicationFragment, 'id'> & {
  hideModal: () => void
}

const CreateTopShieldQuarterModal = ({ id, hideModal }: Props) => {
  const { handleSubmit } = useCreateTopShieldApplicationQuarter({
    topShieldApplicationId: id,
    hideModal
  })

  return (
    <Modal onClose={hideModal} size='small' open>
      <ModalForm title='Add Quarter' onSubmit={handleSubmit}>
        <Modal.Content>
          <CreateTopShieldQuarterFormFields />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive' data-testid='button-complete'>
            Add
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default CreateTopShieldQuarterModal
