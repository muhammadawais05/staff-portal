import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

import { TITLE } from '../LikelihoodToCloseForm'

export type Props = {
  hideModal: () => void
  clientId: string
}

const LikelihoodToCloseContent = lazy(
  () => import('../LikelihoodToCloseContent')
)

const LikelihoodToCloseModal = ({ hideModal, clientId }: Props) => {
  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      defaultTitle={TITLE}
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'updateClientLikelihoodToClose'
      }}
    >
      <LikelihoodToCloseContent clientId={clientId} hideModal={hideModal} />
    </Modal>
  )
}

export default LikelihoodToCloseModal
