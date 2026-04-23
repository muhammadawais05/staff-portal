import { useNotifications } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { FeedbackAnswerInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import {
  CreateFeedbackMatcherAnswersDocument,
  useGetLeaveMatcherFeedbackData
} from './data'
import { CreateFeedbackMatcherAnswersForm } from './components'

type FormAnswer = { questionId: string; optionId?: string }

export type FormData = {
  answers: FormAnswer[]
}

type Props = {
  feedbackId: string
  hideModal: () => void
}

const CreateFeedbackMatcherAnswersModal = ({
  feedbackId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const { data: feedbackData, loading: isFeedbackDataLoading } =
    useGetLeaveMatcherFeedbackData({
      feedbackId,
      onError: () => {
        showError('An error occurred, unable to get data.')
      },
      onCompleted: data => {
        if (!data.node?.matcherQuestions.edges.length) {
          showError('An error occurred, unable to get data.')
        }
      }
    })

  const [
    createFeedbackMatcherAnswers,
    { loading: isCreateFeedbackMatcherAnswersLoading }
  ] = useMutation(CreateFeedbackMatcherAnswersDocument, {
    onCompleted: hideModal,
    onError: () =>
      showError('An error occurred, unable to leave Matcher Feedback.')
  })
  const questions = feedbackData?.node?.matcherQuestions.edges

  const initialValues = useMemo(
    () => ({
      answers:
        questions?.map(({ node: { id: questionId } }) => ({ questionId })) ?? []
    }),
    [questions]
  )

  const handleSubmit = async ({ answers }: FormData) => {
    const { data, errors } = await createFeedbackMatcherAnswers({
      variables: {
        input: {
          feedbackId,
          answers: answers.filter((answer): answer is FeedbackAnswerInput =>
            Boolean(answer.optionId?.length)
          )
        }
      }
    })

    return handleMutationResult({
      rootLevelErrors: errors,
      mutationResult: data?.createFeedbackMatcherAnswers,
      successNotificationMessage:
        'The Matcher Feedback was successfully created.',
      onSuccessAction: hideModal
    })
  }

  return (
    <CreateFeedbackMatcherAnswersForm
      hideModal={hideModal}
      feedbackId={feedbackId}
      isDataLoading={isFeedbackDataLoading}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      questions={questions}
      isMutationLoading={isCreateFeedbackMatcherAnswersLoading}
    />
  )
}

export default CreateFeedbackMatcherAnswersModal
