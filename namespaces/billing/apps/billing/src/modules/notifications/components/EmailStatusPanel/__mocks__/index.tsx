import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ nodeId }) => (
    <div data-testid='EmailStatusPanel'>{nodeId}</div>
  ))

export default MockComponent
