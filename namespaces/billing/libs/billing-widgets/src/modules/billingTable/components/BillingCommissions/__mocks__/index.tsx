import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='BillingCommissions'>
      {JSON.stringify(props?.commissions?.length)}
    </div>
  ))

export default MockComponent
