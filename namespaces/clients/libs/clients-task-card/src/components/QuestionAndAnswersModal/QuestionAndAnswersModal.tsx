import React from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { ClientQuizContent } from '@staff-portal/clients'

import { useGetQuestionAndAnswers } from './data'
import * as S from './styles'

export interface Props {
  hideModal: () => void
  companyId: string
}

const QuestionAndAnswersModal = ({ hideModal, companyId }: Props) => {
  const { data: questionAndAnswers, loading } =
    useGetQuestionAndAnswers(companyId)

  return (
    <Modal open size='large' onClose={hideModal}>
      <Modal.Title>Q&amp;A</Modal.Title>
      {loading ? (
        <ModalSuspender />
      ) : (
        <Modal.Content css={S.modalContent}>
          <ClientQuizContent
            quizItems={questionAndAnswers?.quizItems?.nodes}
            referralPage={questionAndAnswers?.referralPage}
            remoteQuizUrl={questionAndAnswers?.remoteQuizUrl}
          />
        </Modal.Content>
      )}
    </Modal>
  )
}

export default QuestionAndAnswersModal
