import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='NextPurchaseOrderLineEditForm'>{children}</div>
  ))

export default MockComponent
