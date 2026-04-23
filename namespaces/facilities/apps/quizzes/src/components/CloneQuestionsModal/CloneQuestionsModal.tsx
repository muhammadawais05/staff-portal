import React from 'react'
import { Modal } from '@staff-portal/modals-service'

import CloneQuestionsForm from '../CloneQuestionsForm'

interface Props {
  hideModal: () => void
}

const CloneQuestionsModal = ({ hideModal }: Props) => (
  <Modal withForm open onClose={hideModal} size='small'>
    <CloneQuestionsForm hideModal={hideModal} />
  </Modal>
)

export default CloneQuestionsModal
