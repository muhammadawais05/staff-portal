import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='PurchaseOrderEditForm'>{children}</div>
  ))

export default MockComponent
