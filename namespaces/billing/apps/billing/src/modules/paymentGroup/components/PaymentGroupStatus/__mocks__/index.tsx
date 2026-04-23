import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PaymentGroupStatus'>
      {JSON.stringify(props.group.status)}
    </div>
  ))

export default MockComponent
