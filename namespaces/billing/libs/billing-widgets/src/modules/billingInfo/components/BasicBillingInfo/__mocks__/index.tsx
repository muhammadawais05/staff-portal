import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ companyId }) => (
  <div data-testid='BasicBillingInfo'>
    <span data-testid='BasicBillingInfo-companyId'>{companyId}</span>
  </div>
))

export default MockComponent
