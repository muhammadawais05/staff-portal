import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PurchaseOrderEdit' />)

export default MockComponent
