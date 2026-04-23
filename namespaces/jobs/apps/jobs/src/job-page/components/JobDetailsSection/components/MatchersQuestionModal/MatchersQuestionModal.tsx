import React from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { useNotifications } from '@staff-portal/error-handling'
import { UpdateJobMatcherQuestionsInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { JobApplicationQuestions, Question } from '@staff-portal/jobs'

import { useGetMatchersQuestionModalData } from './data/get-matchers-question-modal-data'
import { useUpdateJobMatcherQuestions } from './data/update-job-matcher-questions'
import { convertToApiQuestions } from './utils'

const ERROR_MESSAGE = 'An error occurred, the questions were not updated.'
const SUCCESS_MESSAGE = "The Job Matcher's Questions were successfully updated."

interface MatchersQuestionForm
  extends Pick<UpdateJobMatcherQuestionsInput, 'requiredApplicationPitch'> {
  jobPositionQuestions: Question[]
}

export interface Props {
  jobId: string
  hideModal: () => void
  onMatchersQuestionsSaved: () => void
}

const MatchersQuestionModal = ({
  jobId,
  hideModal,
  onMatchersQuestionsSaved
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const { data, loading } = useGetMatchersQuestionModalData(jobId)
  const [updateJobMatcherQuestions, { loading: updateLoading }] =
    useUpdateJobMatcherQuestions({ onError: () => showError(ERROR_MESSAGE) })

  const handleSubmit = async ({
    jobPositionQuestions,
    requiredApplicationPitch
  }: MatchersQuestionForm) => {
    const { data: result } = await updateJobMatcherQuestions({
      variables: {
        input: {
          requiredApplicationPitch: jobPositionQuestions.some(
            ({ destroy }) => !destroy
          )
            ? requiredApplicationPitch
            : true,
          jobPositionQuestions: convertToApiQuestions(jobPositionQuestions),
          jobId
        }
      }
    })

    return handleMutationResult({
      mutationResult: result?.updateJobMatcherQuestions,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        onMatchersQuestionsSaved()
        hideModal()
      }
    })
  }

  return (
    <Modal
      open
      size='medium'
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'updateJobMatcherQuestions'
      }}
    >
      {loading && <ModalSuspender />}
      {!loading && (
        <ModalForm
          onSubmit={handleSubmit}
          initialValues={data}
          mutators={{ ...arrayMutators }}
          title={`Matcher's Questions`}
        >
          <Modal.Content>
            <JobApplicationQuestions skipStickyQuestions />
          </Modal.Content>

          <Modal.Actions>
            <Button
              variant='secondary'
              disabled={updateLoading}
              onClick={hideModal}
            >
              Cancel
            </Button>
            <Form.SubmitButton variant='positive' data-testid='submit-btn'>
              Save
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default MatchersQuestionModal
