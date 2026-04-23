import { Modal, ModalSuspender, ModalForm } from '@staff-portal/modals-service'
import { SubmissionErrors, Form } from '@toptal/picasso-forms'
import { FormErrors } from '@staff-portal/mutation-result-handlers'
import { Button } from '@toptal/picasso'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'

import { FeedbackQuestionEdgeFragment } from '../../../../data'
import CreateFeedbackAnswersForm from '../../../CreateFeedbackAnswersForm'
import { FormData } from '../../CreateFeedbackMatcherAnswersModal'

type Props = {
  feedbackId: string
  hideModal: () => void
  isDataLoading: boolean
  initialValues?: FormData
  handleSubmit: ({
    answers
  }: FormData) => Promise<void | SubmissionErrors | FormErrors>
  questions?: FeedbackQuestionEdgeFragment[]
  isMutationLoading: boolean
}

const CreateFeedbackMatcherAnswersForm = ({
  hideModal,
  feedbackId,
  isDataLoading,
  initialValues,
  handleSubmit,
  questions,
  isMutationLoading
}: Props) => {
  return (
    <Modal
      open
      size='medium'
      onClose={hideModal}
      data-testid='create-feedback-matcher-answers-modal'
      operationVariables={{
        nodeId: feedbackId,
        nodeType: NodeType.FEEDBACK,
        operationName: 'createFeedbackMatcherAnswers'
      }}
    >
      {isDataLoading && <ModalSuspender />}
      {!isDataLoading && (
        <ModalForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          title='Job Feedback'
        >
          <Modal.Content>
            {!!questions?.length && (
              <CreateFeedbackAnswersForm interactive questions={questions} />
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              variant='secondary'
              onClick={hideModal}
              disabled={isMutationLoading}
            >
              Cancel
            </Button>
            <Form.SubmitButton
              data-testid='create-feedback-matcher-answers-modal-submit-button'
              loading={isMutationLoading}
              variant='positive'
            >
              Submit Feedback
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default CreateFeedbackMatcherAnswersForm
