import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='CommercialDocumentStatus'>
      {JSON.stringify(props.document.status)}
    </div>
  ))

export default MockComponent
