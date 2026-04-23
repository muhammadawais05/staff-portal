import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='InvoiceDisputeTalentModalForm'>
      {props.invoiceDocumentNumber}
    </div>
  ))

export default MockComponent
