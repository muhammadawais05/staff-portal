import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ label, purchaseOrder, isDisabled, isUpdating }) => (
    <div data-testid='PurchaseOrderAssignment'>
      {JSON.stringify({
        label,
        purchaseOrder: {
          id: purchaseOrder?.id
        },
        isDisabled,
        isUpdating
      })}
    </div>
  ))

export default MockComponent
