import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ billingOption }) => (
  <div data-testid='BillingOptionDetails'>
    <span data-testid='BillingOptionDetails-billingOption'>
      {JSON.stringify(billingOption)}
    </span>
  </div>
))

export default MockComponent
