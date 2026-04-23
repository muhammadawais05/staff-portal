import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingSummaryPeriod'>{children}</div>
  ))

export default MockComponent
