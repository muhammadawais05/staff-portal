import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ shouldInitErrorLogging }) => (
    <div data-testid='AnalyticsTracker'>
      <span data-testid='AnalyticsTracker-shouldInitErrorLogging'>
        {JSON.stringify(shouldInitErrorLogging)}
      </span>
    </div>
  ))

export default MockComponent
