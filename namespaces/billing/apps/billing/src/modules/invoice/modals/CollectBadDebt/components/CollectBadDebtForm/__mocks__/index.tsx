import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='CollectBadDebtForm'>
      {JSON.stringify(props.invoiceDocumentNumber)}
    </div>
  ))

export default MockComponent
