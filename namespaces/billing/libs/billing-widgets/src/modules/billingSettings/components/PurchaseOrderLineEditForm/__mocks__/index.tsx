import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='PurchaseOrderLineEditForm'>{children}</div>
  ))

export default MockComponent
