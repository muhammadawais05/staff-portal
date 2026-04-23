import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div
      data-testid={props['data-testid'] || 'AmountWithStatusColor'}
      data-status={props.status}
      data-amount={props.amount}
    />
  ))

export default MockComponent
