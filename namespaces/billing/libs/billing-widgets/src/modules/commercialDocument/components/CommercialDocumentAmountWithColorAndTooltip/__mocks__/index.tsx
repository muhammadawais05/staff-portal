import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='CommercialDocumentAmountWithColorAndTooltip'>
      {Number(props.document.amount || '0')}
    </div>
  ))

export default MockComponent
