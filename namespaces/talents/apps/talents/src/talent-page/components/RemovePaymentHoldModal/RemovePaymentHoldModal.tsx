import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useRemovePaymentHold } from './data'

export interface Props {
  talentId: string
  fullName: string
  hideModal: () => void
}

const RemovePaymentHoldModal = ({ talentId, fullName, hideModal }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [removePaymentHold, { loading }] = useRemovePaymentHold({
    onCompleted: data => {
      if (data.removePaymentHold?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
      }
    },
    onError: () =>
      showError(`An error occurred, the Payments Hold was not released.`)
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await removePaymentHold({
      variables: {
        input: {
          talentId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.removePaymentHold,
      successNotificationMessage:
        'The Payments Hold was successfully released.',
      onSuccessAction: hideModal
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      variant='positive'
      required
      label='Comment'
      textFieldName='comment'
      title={`Remove hold for ${fullName}`}
      submitText='Remove Hold'
      message="Are you sure you want to remove the hold from this role's payments?"
      placeholder='Please specify a reason.'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'removePaymentHold'
      }}
    />
  )
}

export default RemovePaymentHoldModal
