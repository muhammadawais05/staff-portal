import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ invoice }) => (
    <div data-testid='InvoicePayModalContent'>{JSON.stringify(invoice.id)}</div>
  ))

export default MockComponent
