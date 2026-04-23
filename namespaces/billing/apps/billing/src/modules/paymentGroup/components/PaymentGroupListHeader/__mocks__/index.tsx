import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PaymentGroupListHeader' />)

export default MockComponent
