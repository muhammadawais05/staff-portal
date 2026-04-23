import React from 'react'
import { Modal } from '@staff-portal/modals-service'

import QuizQuestionForm from '../QuizQuestionForm'
import useAddNewQuestion from './use-add-new-question'

interface Props {
  hideModal: () => void
}

const AddNewQuestionModal = ({ hideModal }: Props) => {
  const { handleSubmit } = useAddNewQuestion({
    onSuccess: hideModal
  })

  return (
    <Modal withForm open onClose={hideModal} size='small'>
      <Modal.Title>Add New Question</Modal.Title>
      <QuizQuestionForm
        submitButtonText='Add Question'
        onCancel={hideModal}
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}

export default AddNewQuestionModal
