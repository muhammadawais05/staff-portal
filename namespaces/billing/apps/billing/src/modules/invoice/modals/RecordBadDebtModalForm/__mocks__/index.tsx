import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='InvoiceRecordBadDebtModalForm'>
      {props.invoiceDocumentNumber}
    </div>
  ))

export default MockComponent
