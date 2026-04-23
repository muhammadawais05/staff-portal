import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PaymentGroupDetailsPage' />)

export default MockComponent
