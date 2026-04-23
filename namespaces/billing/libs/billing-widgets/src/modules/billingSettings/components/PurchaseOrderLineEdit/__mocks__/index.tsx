import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PurchaseOrderLineEdit' />)

export default MockComponent
