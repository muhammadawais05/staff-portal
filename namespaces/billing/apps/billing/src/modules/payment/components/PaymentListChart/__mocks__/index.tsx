import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PaymentListChart' />)

export default MockComponent
