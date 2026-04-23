import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <span data-testid='ExpectedCommissionShortDescription'>
      {JSON.stringify(props.expectedCommission.id)}
    </span>
  ))

export default MockComponent
