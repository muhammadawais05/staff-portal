import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const testId = props['data-testid'] || 'ContractsSection'

  return (
    <div data-testid={testId}>
      <div data-testid={`${testId}-nodeId`}>{props.nodeId}</div>
    </div>
  )
})

export default MockComponent
