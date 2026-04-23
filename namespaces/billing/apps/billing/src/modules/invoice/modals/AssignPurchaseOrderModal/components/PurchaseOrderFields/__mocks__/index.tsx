import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PurchaseOrderFields'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
