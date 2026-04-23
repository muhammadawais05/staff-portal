import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='ApplyUnallocatedMemorandums'>
      {JSON.stringify(props.nodeId)}
    </div>
  ))

export default MockComponent
