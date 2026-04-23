import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='PurchaseOrderLinesFormContent'>{children}</div>
  ))

export default MockComponent
