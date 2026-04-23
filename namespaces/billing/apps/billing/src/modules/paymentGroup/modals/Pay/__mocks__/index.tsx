import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PaymentGroupPayModal'>
      {JSON.stringify(props.paymentGroupId)}
    </div>
  ))

export default MockComponent
