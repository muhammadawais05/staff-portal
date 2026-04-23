import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='ExternalIntegrator'>{children}</div>
  ))

export default MockComponent
