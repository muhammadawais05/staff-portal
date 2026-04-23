import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ invoices, statusColumnEnabled, selectionEnabled }) => (
    <div data-testid='InvoiceList'>
      <span data-testid='InvoiceList-invoices'>{invoices.length}</span>
      <span data-testid='InvoiceList-selectionEnabled'>
        {JSON.stringify(selectionEnabled)}
      </span>
      <span data-testid='InvoiceList-statusColumnEnabled'>
        {JSON.stringify(statusColumnEnabled)}
      </span>
    </div>
  ))

export default MockComponent
