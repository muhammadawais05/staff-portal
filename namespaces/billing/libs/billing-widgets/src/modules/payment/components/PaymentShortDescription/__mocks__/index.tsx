import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <span data-testid='PaymentShortDescription' />)

export default MockComponent
