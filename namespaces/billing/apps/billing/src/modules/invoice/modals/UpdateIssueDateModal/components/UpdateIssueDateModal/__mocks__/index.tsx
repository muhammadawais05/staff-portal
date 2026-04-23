import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='UpdateIssueDateModal'>
      {JSON.stringify([props.nodeId, props.nodeType])}
    </div>
  ))

export default MockComponent
