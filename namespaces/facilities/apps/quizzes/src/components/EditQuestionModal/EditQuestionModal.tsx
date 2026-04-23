import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { TalentQuizQuestion } from '@staff-portal/graphql/staff'

import QuizQuestionForm from '../QuizQuestionForm'
import useEditQuestion from './use-edit-question'

interface Props {
  question: TalentQuizQuestion
  hideModal: () => void
}

const EditQuestionModal = ({ question, hideModal }: Props) => {
  const { handleSubmit } = useEditQuestion({
    questionId: question.id,
    onSuccess: hideModal
  })

  return (
    <Modal withForm open onClose={hideModal} size='small'>
      <Modal.Title>Edit Question</Modal.Title>
      <QuizQuestionForm
        submitButtonText='Update Question'
        question={question}
        onCancel={hideModal}
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}

export default EditQuestionModal
