import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingHeader'>{children}</div>
  ))

export default MockComponent
