import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='InvoiceSettings' />)

export default MockComponent
