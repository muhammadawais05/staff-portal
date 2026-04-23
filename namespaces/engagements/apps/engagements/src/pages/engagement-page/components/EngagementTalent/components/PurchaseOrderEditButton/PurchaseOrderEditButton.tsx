import { Button } from '@toptal/picasso'
import React from 'react'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationFragment } from '@staff-portal/operations'

import PurchaseOrderEditModal from '../PurchaseOrderEditModal'

type Props = {
  engagementId: string
  operation: OperationFragment
  poLinesEnabled: boolean
}

const PurchaseOrderEditButton = ({
  engagementId,
  operation,
  poLinesEnabled
}: Props) => {
  const { showModal } = useModal(PurchaseOrderEditModal, {
    engagementId,
    poLinesEnabled
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showModal}
          data-testid='purchase-order-edit-button'
        >
          Edit
        </Button>
      )}
    />
  )
}

export default PurchaseOrderEditButton
