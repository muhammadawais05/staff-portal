import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='ModalState'>{children}</div>
  ))

export default MockComponent
