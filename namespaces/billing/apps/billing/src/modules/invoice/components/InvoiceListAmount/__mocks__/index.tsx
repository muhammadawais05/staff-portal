import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ invoice }) => (
  <div data-testid='InvoiceListAmount'>
    <span data-testid='InvoiceListAmount-invoice'>{invoice.id}</span>
  </div>
))

export default MockComponent
