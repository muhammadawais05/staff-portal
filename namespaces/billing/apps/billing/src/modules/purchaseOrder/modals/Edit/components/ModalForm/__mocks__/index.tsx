import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='PurchaseOrderEditModalForm'>{children}</div>
  ))

export default MockComponent
