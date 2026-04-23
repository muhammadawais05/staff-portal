import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { PurchaseOrderEditForm, PurchaseOrderLineEditForm } from './components'

export type Props = {
  engagementId: string
  hideModal: () => void
  poLinesEnabled: boolean
}

const PurchaseOrderEditModal = ({
  engagementId,
  hideModal,
  poLinesEnabled = false
}: Props) => {
  return (
    <Modal
      open
      withForm
      size='small'
      onClose={hideModal}
      data-testid='purchase-edit-order-modal'
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: poLinesEnabled
          ? 'assignEngagementPurchaseOrderLine'
          : 'assignEngagementPurchaseOrder'
      }}
    >
      {poLinesEnabled ? (
        <PurchaseOrderLineEditForm
          engagementId={engagementId}
          hideModal={hideModal}
        />
      ) : (
        <PurchaseOrderEditForm
          engagementId={engagementId}
          hideModal={hideModal}
        />
      )}
    </Modal>
  )
}

export default PurchaseOrderEditModal
