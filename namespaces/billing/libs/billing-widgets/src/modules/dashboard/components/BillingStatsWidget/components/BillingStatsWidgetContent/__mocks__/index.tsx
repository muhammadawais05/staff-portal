import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ data }) => (
    <div data-testid='BillingStatsWidgetContent'>{JSON.stringify(data)}</div>
  ))

export default MockComponent
