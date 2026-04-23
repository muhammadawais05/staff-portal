import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingSummary'>{children}</div>
  ))

export default MockComponent
