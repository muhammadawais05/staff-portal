import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ children, flags }) => (
  <div data-testid='FeatureFlagsContainer'>
    <span data-testid='FeatureFlagsContainer-flags'>{flags}</span>
    {children}
  </div>
))

export default MockComponent
