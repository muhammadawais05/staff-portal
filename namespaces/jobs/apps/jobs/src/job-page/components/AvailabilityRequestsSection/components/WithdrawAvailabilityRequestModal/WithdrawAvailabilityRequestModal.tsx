import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { JOB_AVAILABILITY_REQUEST_UPDATED } from '@staff-portal/jobs'

import { useWithdrawAvailabilityRequest } from './data/withdraw-availability-request'
import { useGetWithdrawAvailabilityRequestReasons } from './data/get-withdraw-availability-request-reasons'
import WithdrawAvailabilityRequestForm, {
  WithdrawAvailabilityRequestFormProps
} from '../WithdrawAvailabilityRequestForm'

type Props = {
  availabilityRequestId: string
  hideModal: () => void
}

const WithdrawAvailabilityRequestModal = ({
  availabilityRequestId,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { reasons } = useGetWithdrawAvailabilityRequestReasons()

  const [withdrawAvailabilityRequest, { loading }] =
    useWithdrawAvailabilityRequest({
      onError: () =>
        showError(
          'An error occurred, the Availability Request was not withdrawn.'
        )
    })

  const handleSubmit = async (form: WithdrawAvailabilityRequestFormProps) => {
    const { data } = await withdrawAvailabilityRequest({
      variables: {
        input: {
          ...form,
          availabilityRequestId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.withdrawAvailabilityRequest,
      successNotificationMessage: 'The Availability Request is now withdrawn.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_AVAILABILITY_REQUEST_UPDATED, { availabilityRequestId })
        hideModal()
      }
    })
  }

  return (
    <Modal
      withForm
      open
      size='small'
      onClose={hideModal}
      data-testid='WithdrawAvailabilityRequestModal'
      operationVariables={{
        nodeId: availabilityRequestId,
        nodeType: NodeType.AVAILABILITY_REQUEST,
        operationName: 'withdrawAvailabilityRequest'
      }}
    >
      <Modal.Title>Withdraw Availability Request</Modal.Title>

      <Form<WithdrawAvailabilityRequestFormProps> onSubmit={handleSubmit}>
        <Modal.Content>
          <WithdrawAvailabilityRequestForm reasons={reasons} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            disabled={loading}
            onClick={hideModal}
            data-testid='WithdrawAvailabilityRequestModal-cancel-button'
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='negative'
            data-testid='WithdrawAvailabilityRequestModal-submit-button'
          >
            Withdraw Availability Request
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default WithdrawAvailabilityRequestModal
