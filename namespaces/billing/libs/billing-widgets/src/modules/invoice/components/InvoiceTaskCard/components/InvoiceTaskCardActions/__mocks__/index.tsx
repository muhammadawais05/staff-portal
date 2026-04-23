import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({ invoice: { id }, taskPlaybookIdentifier, taskStatus }) => (
      <div data-testid='InvoiceTaskCardActions'>
        {JSON.stringify({
          invoiceId: id,
          taskPlaybookIdentifier,
          taskStatus
        })}
      </div>
    )
  )

export default MockComponent
