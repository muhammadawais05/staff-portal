import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ engagementId }) => (
  <div data-testid='EngagementPage'>
    <span data-testid='EngagementPage-engagementId'>{engagementId}</span>
  </div>
))

export default MockComponent
