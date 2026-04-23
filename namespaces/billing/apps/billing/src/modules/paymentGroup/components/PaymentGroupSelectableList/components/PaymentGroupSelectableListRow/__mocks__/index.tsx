import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PaymentGroupSelectableListRow'>
      {JSON.stringify(props.paymentGroup.id)}
    </div>
  ))

export default MockComponent
