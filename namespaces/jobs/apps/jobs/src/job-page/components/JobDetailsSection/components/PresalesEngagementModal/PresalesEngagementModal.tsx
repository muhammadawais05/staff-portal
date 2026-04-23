import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { useUpdateJobPresalesEngagement } from './data/update-job-presales-engagement'
import PresalesEngagementForm, {
  PresalesEngagementFormProps
} from './components/PresalesEngagementForm'
import { JobDetailsInformationFragment } from '../JobDetailsInformation/data/get-job-details-information/get-job-details-information.staff.gql.types'

interface Props
  extends Pick<
    JobDetailsInformationFragment,
    'presalesEngagement' | 'presalesEngagementComment'
  > {
  jobId: string
  hideModal: () => void
}

const PresalesEngagementModal = ({
  jobId,
  presalesEngagement,
  presalesEngagementComment,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [updateJobPresalesEngagement, { loading }] =
    useUpdateJobPresalesEngagement({
      onError: () =>
        showError(
          'An error occurred, the Pre-sales Engagement was not updated.'
        )
    })

  const handleSubmit = async (formValues: PresalesEngagementFormProps) => {
    const { data: result } = await updateJobPresalesEngagement({
      variables: {
        input: {
          ...formValues,
          presalesEngagement: formValues.presalesEngagement === 'true',
          jobId
        }
      }
    })

    return handleMutationResult({
      mutationResult: result?.updateJobPresalesEngagement,
      successNotificationMessage:
        'The Pre-sales Engagement was successfully updated.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  return (
    <Modal
      withForm
      open
      size='small'
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'updateJobPresalesEngagement'
      }}
      data-testid='presales-engagement-modal'
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Edit Pre-sales Engagement</Modal.Title>
        <Modal.Content>
          <PresalesEngagementForm
            presalesEngagement={presalesEngagement ? 'true' : 'false'}
            presalesEngagementComment={presalesEngagementComment}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal} disabled={loading}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>Save</Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default PresalesEngagementModal
