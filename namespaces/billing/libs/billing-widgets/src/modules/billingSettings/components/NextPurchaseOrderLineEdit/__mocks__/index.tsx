import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='NextPurchaseOrderLineEdit' />)

export default MockComponent
