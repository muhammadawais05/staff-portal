import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PaymentListHeader' />)

export default MockComponent
