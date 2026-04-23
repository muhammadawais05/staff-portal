import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingHeaderFilter'>{children}</div>
  ))

export default MockComponent
