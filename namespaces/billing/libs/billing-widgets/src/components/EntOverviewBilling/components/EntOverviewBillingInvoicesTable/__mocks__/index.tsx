import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingInvoicesTable'>{children}</div>
  ))

export default MockComponent
