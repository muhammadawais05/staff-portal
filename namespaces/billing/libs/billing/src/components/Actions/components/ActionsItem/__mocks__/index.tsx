import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const testId = props['data-testid'] || props.option || 'ActionsItem'

  return (
    <div data-testid='ActionsItem'>
      <div data-testid={`${testId}-nodeId`}>{props.nodeId}</div>
      <div data-testid={`${testId}-option`}>{props.option}</div>
      <div data-testid={`${testId}-label`}>{props.label}</div>
      <div data-testid={`${testId}-operation`}>
        {JSON.stringify(props.operation)}
      </div>
    </div>
  )
})

export default MockComponent
