import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PaymentSelectableListRow'>
      {JSON.stringify(props.payment.id)}
    </div>
  ))

export default MockComponent
