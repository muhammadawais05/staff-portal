import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='FormContent'>{children}</div>
  ))

export default MockComponent
