import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='Modals'>{children}</div>
  ))

export default MockComponent
