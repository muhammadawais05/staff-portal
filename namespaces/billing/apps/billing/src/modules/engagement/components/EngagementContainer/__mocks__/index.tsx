import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='EngagementContainer'>{children}</div>
  ))

export default MockComponent
