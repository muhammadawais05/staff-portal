import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ purchaseOrder }) => (
    <div data-testid='PurchaseOrderDetailsTableContent'>
      {JSON.stringify({ purchaseOrderId: purchaseOrder?.id })}
    </div>
  ))

export default MockComponent
