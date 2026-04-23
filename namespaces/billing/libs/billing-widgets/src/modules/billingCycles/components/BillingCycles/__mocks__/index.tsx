import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ engagementId, actions }) => (
    <div data-testid='BillingCycles'>
      <span data-testid='BillingCycles-actions'>{actions}</span>
      <span data-testid='BillingCycles-engagementId'>{engagementId}</span>
    </div>
  ))

export default MockComponent
