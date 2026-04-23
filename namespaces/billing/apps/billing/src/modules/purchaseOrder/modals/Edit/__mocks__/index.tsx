import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PurchaseOrderEditModal' />)

export default MockComponent
