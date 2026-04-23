import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { TOPSCREEN_FEATURE_ENABLED } from '@staff-portal/clients'

import { EnableTopscreenFeatureDocument } from './data/enable-topscreen-feature'

type Props = {
  clientId: string
  hideModal: () => void
}

const EnableTopscreenModal = ({ hideModal, clientId }: Props) => {
  const emitMessage = useMessageEmitter()

  const handleSuccess = () => {
    emitMessage(TOPSCREEN_FEATURE_ENABLED, { clientId })
    hideModal()
  }

  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: EnableTopscreenFeatureDocument,
    mutationResultOptions: {
      onSuccessAction: handleSuccess,
      successNotificationMessage:
        'You have successfully enabled TopScreen feature.'
    },
    errorNotificationMessage: 'TopScreen Feature could not be enabled.'
  })

  return (
    <PromptModal
      open
      title='Enable TopScreen Feature'
      message='Once you enable the feature, the client will have the possibility to use the TopScreen feature.'
      submitText='Enable'
      loading={loading}
      onSubmit={() => handleSubmit({ clientId })}
      onClose={hideModal}
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'enableTopscreenFeature'
      }}
    />
  )
}

export default EnableTopscreenModal
