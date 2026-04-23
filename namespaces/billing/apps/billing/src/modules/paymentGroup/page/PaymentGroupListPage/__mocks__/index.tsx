import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='PaymentGroupListPage' />)

export default MockComponent
