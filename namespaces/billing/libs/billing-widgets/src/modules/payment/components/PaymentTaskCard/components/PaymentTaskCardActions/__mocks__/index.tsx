import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PaymentTaskCardActions'>
      {JSON.stringify(props.payment.id)}
    </div>
  ))

export default MockComponent
