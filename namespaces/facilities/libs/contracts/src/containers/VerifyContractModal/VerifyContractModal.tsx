import React from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import {
  useVerifyContract,
  VerifyContractMutation
} from './data/verify-contract'

export interface Props {
  contractId: string
  onMutationSuccess?: (data: VerifyContractMutation) => void
  hideModal: () => void
}

const VerifyContractModal = ({
  hideModal,
  contractId,
  onMutationSuccess
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const onError = () => showError('Unable to verify the contract.')
  const [verifyContract] = useVerifyContract({
    onCompleted: data => {
      if (data.verifyContract?.success) {
        onMutationSuccess?.(data)
        hideModal()
      }
    },
    onError
  })

  const handleSubmit = async () => {
    const result = await verifyContract({
      variables: { input: { contractId } }
    })

    handleMutationResult({
      mutationResult: result.data?.verifyContract,
      successNotificationMessage: 'Contract has been verified.'
    })
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      title='Verify Contract'
      message='Are you sure you want to verify this contract?'
      submitText='Verify Contract'
      onSubmit={handleSubmit}
      operationVariables={{
        nodeId: contractId,
        nodeType: NodeType.CONTRACT,
        operationName: 'verifyContract'
      }}
    />
  )
}

export default VerifyContractModal
