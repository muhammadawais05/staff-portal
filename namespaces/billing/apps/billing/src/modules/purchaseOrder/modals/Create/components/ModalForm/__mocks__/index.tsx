import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='PurchaseOrderCreateModalForm'>{children}</div>
  ))

export default MockComponent
