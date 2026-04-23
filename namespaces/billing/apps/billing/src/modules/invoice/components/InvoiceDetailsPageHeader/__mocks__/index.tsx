import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ invoiceId }) => (
    <div data-testid='InvoiceDetailsPageHeader'>{invoiceId}</div>
  ))

export default MockComponent
