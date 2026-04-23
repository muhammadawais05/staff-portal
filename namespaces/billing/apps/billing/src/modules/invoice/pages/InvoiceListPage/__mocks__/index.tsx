import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='InvoiceListPage' />)

export default MockComponent
