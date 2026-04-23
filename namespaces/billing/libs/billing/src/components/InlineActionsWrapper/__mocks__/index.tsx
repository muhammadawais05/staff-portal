import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='InlineActionsWrapper'>{children}</div>
  ))

export default MockComponent
