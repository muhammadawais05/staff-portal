import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingPurchaseOrdersTable'>{children}</div>
  ))

export default MockComponent
