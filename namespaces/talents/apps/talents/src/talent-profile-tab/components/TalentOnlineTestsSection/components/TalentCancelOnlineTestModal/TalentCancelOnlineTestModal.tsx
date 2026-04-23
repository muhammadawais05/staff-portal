import { Button, Container, Typography } from '@toptal/picasso'
import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { Form, FormApi, SubmissionErrors } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { CancelOnlineTestAttemptInput } from '@staff-portal/graphql/staff'
import {
  concatUnexpectedValidationErrors,
  useHandleMutationResult
} from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useCancelOnlineTestAttempt } from './hooks'

export interface Props {
  hideModal: () => void
  talentId: string
  testName: string
  testType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
  testId: string
}

const TalentCancelOnlineTestModal = ({
  hideModal,
  talentId,
  testId,
  testName,
  testType
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const [cancelOnlineTestAttempt, { loading }] = useCancelOnlineTestAttempt({
    onError: () =>
      showError('An error occurred, the online test was not cancelled.'),
    onCompleted: data => {
      if (data?.cancelOnlineTestAttempt?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    },
    talentId
  })

  const handleSubmit = async (
    input: CancelOnlineTestAttemptInput,
    _: FormApi<CancelOnlineTestAttemptInput>,
    setSubmissionErrors: ((errors?: SubmissionErrors) => void) | undefined
  ) => {
    const cancelOnlineTestAttemptResult = await cancelOnlineTestAttempt({
      variables: { input: { ...input, onlineTestAttemptId: testId } }
    })

    const validationErrors = handleMutationResult({
      mutationResult:
        cancelOnlineTestAttemptResult?.data?.cancelOnlineTestAttempt,
      successNotificationMessage: 'Online test was canceled.'
    })

    if (validationErrors) {
      setSubmissionErrors?.(validationErrors)
      const unexpectedValidationErrors = concatUnexpectedValidationErrors(
        validationErrors as Record<string, string>,
        Object.keys(input)
      )

      if (unexpectedValidationErrors) {
        showError(unexpectedValidationErrors)
      }
    }
  }

  const testTypeName =
    testType === NodeType.CODILITY_RESULT ? 'Codility' : 'Hacker Rank'

  return (
    <Modal
      withForm
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: testId,
        nodeType: testType,
        operationName: 'cancelOnlineTestAttempt'
      }}
    >
      <Form<CancelOnlineTestAttemptInput> onSubmit={handleSubmit}>
        <Modal.Title>Cancel Online Test</Modal.Title>
        <Modal.Content>
          <Container bottom='medium' data-testid='modal-text-content'>
            <Typography size='medium'>
              Are you sure you want to cancel this <strong>{testName}</strong>{' '}
              test? Doing so will automatically cancel the test on{' '}
              {testTypeName} as well.
            </Typography>
          </Container>
          <Form.Input
            label='Comment'
            name='comment'
            required
            width='full'
            multiline
            rows={4}
            data-testid='comment-field'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Button
            variant='negative'
            loading={loading}
            type='submit'
            data-testid='cancel-online-test-button'
          >
            Cancel Online Test
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default TalentCancelOnlineTestModal
