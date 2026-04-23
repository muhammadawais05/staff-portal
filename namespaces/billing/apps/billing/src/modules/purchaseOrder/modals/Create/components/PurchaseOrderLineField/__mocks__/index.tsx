import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='purchase-order-line-field'>{children}</div>
  ))

export default MockComponent
