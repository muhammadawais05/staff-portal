import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='BillingStatsWidgetWrapper' />)

export default MockComponent
