import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='InvoiceListSearch' />)

export default MockComponent
