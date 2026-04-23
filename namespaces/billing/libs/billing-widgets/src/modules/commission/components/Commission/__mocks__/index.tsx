import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ nodeId }) => (
  <div data-testid='Commission'>
    <span data-testid='Commission-nodeId'>{nodeId}</span>
  </div>
))

export default MockComponent
