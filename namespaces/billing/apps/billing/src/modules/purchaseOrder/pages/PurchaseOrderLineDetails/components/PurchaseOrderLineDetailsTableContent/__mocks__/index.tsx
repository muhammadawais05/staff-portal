import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ purchaseOrderLine }) => (
    <div data-testid='PurchaseOrderLineDetailsTableContent'>
      {JSON.stringify({ purchaseOrderLineId: purchaseOrderLine?.id })}
    </div>
  ))

export default MockComponent
