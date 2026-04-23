import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Typography, Container } from '@toptal/picasso'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import {
  useResendContract,
  ResendContractMutation
} from '../ResendContractButton/data/resend-contract'

export interface Props {
  hideModal: () => void
  contractId: string
  onMutationSuccess?: (data: ResendContractMutation) => void
}

const ResendContractModal = ({
  hideModal,
  contractId,
  onMutationSuccess
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Unable to resend the contract.')
  }

  const [resendContract, { loading }] = useResendContract({
    onCompleted: data => {
      if (data.resendContract?.success) {
        hideModal()
        onMutationSuccess?.(data)
      }
    },
    onError
  })

  const handleSubmit = async () => {
    const { data } = await resendContract({
      variables: {
        input: {
          contractId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.resendContract,
      successNotificationMessage: `The contract was resent.`
    })
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: contractId,
        nodeType: NodeType.CONTRACT,
        operationName: 'resendContract'
      }}
    >
      <ModalForm onSubmit={handleSubmit} title='Resend Contract'>
        <Modal.Content>
          <Container bottom='large'>
            <Typography size='medium'>
              Are you sure you want to resend this contract?
            </Typography>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hideModal} variant='secondary' disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' variant='positive' loading={loading}>
            Resend Contract
          </Button>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ResendContractModal
