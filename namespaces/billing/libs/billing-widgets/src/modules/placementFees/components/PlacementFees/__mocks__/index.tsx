import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ engagementId, data }) => (
  <div data-testid='PlacementFees'>
    <span data-testid='PlacementFees-engagementId'>{engagementId}</span>
    <span data-testid='PlacementFees-data'>{JSON.stringify(data)}</span>
  </div>
))

export default MockComponent
