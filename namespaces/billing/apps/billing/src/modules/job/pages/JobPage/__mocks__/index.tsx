import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ engagementId }) => (
  <div data-testid='JobPage'>
    <span data-testid='JobPage-engagementId'>{engagementId}</span>
  </div>
))

export default MockComponent
