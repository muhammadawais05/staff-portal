import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ invoice }) => (
  <div data-testid='InvoiceListDate'>
    <span data-testid='InvoiceListDate-invoice'>{invoice.id}</span>
  </div>
))

export default MockComponent
