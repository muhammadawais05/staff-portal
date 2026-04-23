import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PaymentPayModal'>{JSON.stringify(props.paymentId)}</div>
  ))

export default MockComponent
