import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='InvoiceRecordBadDebtModal'>
      {JSON.stringify(props.invoice.id)}
    </div>
  ))

export default MockComponent
