import { Modal, ModalSuspender, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { FeedbackAnswerInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { useCopyToClipBoard } from '@staff-portal/clipboard'

import CreateFeedbackAnswersForm from '../CreateFeedbackAnswersForm'
import {
  useCreateFeedbackClientAnswers,
  useGetLeaveClientFeedbackData
} from './data'

type FormData = {
  answers: FeedbackAnswerInput[]
}

type Props = {
  feedbackId: string
  hideModal: () => void
}

const CreateFeedbackClientAnswersModal = ({ feedbackId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const { data: feedbackData, loading: isFeedBackDataLoading } =
    useGetLeaveClientFeedbackData({
      feedbackId,
      onError: () => {
        showError('An error occurred, unable to get data.')
      },
      onCompleted: data => {
        if (!data.node?.clientQuestions.edges.length) {
          showError('An error occurred, unable to get data.')
        }
      }
    })

  const [
    createFeedbackClientAnswers,
    { loading: isCreateFeedbackClientAnswersLoading }
  ] = useCreateFeedbackClientAnswers({
    onError: () =>
      showError('An error occurred, unable to leave client feedback.')
  })

  const { copyToClipboard } = useCopyToClipBoard()

  const clientUrl = feedbackData?.node?.clientUrl
  const questions = feedbackData?.node?.clientQuestions?.edges

  const initialValues = useMemo(
    () => ({
      answers:
        questions?.map(({ node: { id: questionId } }) => ({
          questionId,
          optionId: ''
        })) ?? []
    }),
    [questions]
  )

  const handleCopyToClipboard = async () => {
    await copyToClipboard({
      data: clientUrl || '',
      successMessage: 'Copied to clipboard.'
    })
  }

  const handleSubmit = async ({ answers }: FormData) => {
    const { data, errors } = await createFeedbackClientAnswers({
      variables: { input: { feedbackId, answers } }
    })

    return handleMutationResult({
      rootLevelErrors: errors,
      mutationResult: data?.createFeedbackClientAnswers,
      successNotificationMessage:
        'The Client Feedback was successfully created.',
      onSuccessAction: hideModal
    })
  }

  return (
    <Modal
      open
      size='medium'
      onClose={hideModal}
      data-testid='create-feedback-client-answers-modal'
      operationVariables={{
        nodeId: feedbackId,
        nodeType: NodeType.FEEDBACK,
        operationName: 'createFeedbackClientAnswers'
      }}
    >
      {isFeedBackDataLoading && <ModalSuspender />}
      {!isFeedBackDataLoading && (
        <ModalForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          title={`Feedback on Client's behalf`}
        >
          <Modal.Content>
            <Container bottom='medium'>
              <Container flex bottom='xsmall' alignItems='center'>
                <Typography size='medium'>
                  Please share this link with the client so they can give us
                  feedback directly.
                </Typography>

                <Container left='xsmall'>
                  <Button
                    size='small'
                    variant='positive'
                    onClick={handleCopyToClipboard}
                    data-testid='create-feedback-client-answers-modal-copy-link-button'
                  >
                    Copy Link
                  </Button>
                </Container>
              </Container>

              <Typography size='medium'>
                If you have talked to the client and know their feedback, you
                may submit it here on their behalf.
              </Typography>
            </Container>

            {!!questions?.length && (
              <CreateFeedbackAnswersForm questions={questions} />
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              variant='secondary'
              onClick={hideModal}
              disabled={isCreateFeedbackClientAnswersLoading}
            >
              Cancel
            </Button>
            <Form.SubmitButton
              data-testid='create-feedback-client-answers-modal-submit-button'
              loading={isCreateFeedbackClientAnswersLoading}
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

export default CreateFeedbackClientAnswersModal
