import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PaymentGroupListSearch' />)

export default MockComponent
