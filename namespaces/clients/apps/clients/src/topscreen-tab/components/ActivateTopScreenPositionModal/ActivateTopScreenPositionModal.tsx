import React from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { TOPSCREEN_POSITION_UPDATED } from '@staff-portal/clients'

import { ActivateTopscreenPositionDocument } from './data/activate-topscreen-position/activate-topscreen-position.staff.gql.types'

type Props = {
  positionId: string
  hideModal: () => void
}

const ActivateTopScreenPositionModal = ({ hideModal, positionId }: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: ActivateTopscreenPositionDocument,
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: TOPSCREEN_POSITION_UPDATED,
        payload: { positionId }
      },
      onSuccessAction: hideModal,
      successNotificationMessage:
        'You have successfully activated the Position.'
    },
    errorNotificationMessage: 'TopScreen Position could not be activated.'
  })

  const onSubmit = () => handleSubmit({ topscreenPositionId: positionId })

  return (
    <PromptModal
      open
      title='Activate TopScreen Position'
      message='Once you activate the position, the related talents will be automatically sent to a screening process.'
      submitText='Activate'
      loading={loading}
      onSubmit={onSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: positionId,
        nodeType: NodeType.TOPSCREEN_POSITION,
        operationName: 'activateTopscreenPosition'
      }}
    />
  )
}

export default ActivateTopScreenPositionModal
