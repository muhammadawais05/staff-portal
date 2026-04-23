import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <div data-testid='BillingCycleTableRowCommitment'>
    {JSON.stringify(props?.actualCommitment?.startDate)}
    {JSON.stringify(props?.originalCommitment?.startDate)}
    {JSON.stringify(props?.isRemoved)}
  </div>
))

export default MockComponent
