import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EntOverviewBillingTimesheetsTable'>{children}</div>
  ))

export default MockComponent
