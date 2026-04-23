import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => (
    <div data-testid='InvoiceListHeaderReconciliationButton' />
  ))

export default MockComponent
