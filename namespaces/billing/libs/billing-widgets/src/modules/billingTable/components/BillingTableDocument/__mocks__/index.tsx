import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <div data-testid='BillingTableDocument'>
    {JSON.stringify(props?.document?.id)}
    {JSON.stringify(props?.hasChildAdjustments)}
  </div>
))

export default MockComponent
