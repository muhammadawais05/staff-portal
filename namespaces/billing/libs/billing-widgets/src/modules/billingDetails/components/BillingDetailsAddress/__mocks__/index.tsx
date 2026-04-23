import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ companyId }) => (
  <div data-testid='BillingDetailsAddress'>
    <span data-testid='BillingDetailsAddress-companyId'>{companyId}</span>
  </div>
))

export default MockComponent
