import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ companyId }) => (
  <div data-testid='BillingDetails'>
    <span data-testid='BillingDetails-companyId'>{companyId}</span>
  </div>
))

export default MockComponent
