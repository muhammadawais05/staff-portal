import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='InvoiceModalVariations'>{children}</div>
  ))

export default MockComponent
