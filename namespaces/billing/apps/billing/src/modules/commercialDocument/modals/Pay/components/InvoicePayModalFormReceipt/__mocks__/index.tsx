import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='InvoicePayModalFormReceipt'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
