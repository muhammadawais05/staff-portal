import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ clientId }) => (
  <div data-testid='ConsolidationDefaultsPage'>
    <span data-testid='ConsolidationDefaultsPage-clientId'>{clientId}</span>
  </div>
))

export default MockComponent
