import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <span data-testid='InvoiceShortDescription' />)

export default MockComponent
