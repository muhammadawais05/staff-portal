import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ engagementId }) => (
  <div data-testid='ExtraExpenses'>
    <span data-testid='ExtraExpenses-engagementId'>{engagementId}</span>
  </div>
))

export default MockComponent
