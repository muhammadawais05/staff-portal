import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='BillingStatsWidget' />)

export default MockComponent
