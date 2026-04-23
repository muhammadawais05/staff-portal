import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='NextPurchaseOrderEditForm'>{children}</div>
  ))

export default MockComponent
