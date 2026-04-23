import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ availablePaymentSources, invoice: { id } }) => (
    <div data-testid='InvoicePayModalForm'>
      {JSON.stringify({ availablePaymentSources, invoiceId: id })}
    </div>
  ))

export default MockComponent
