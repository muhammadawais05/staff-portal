import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const testId = props['data-testid'] || 'BillingRecentActivityButton'

  return (
    <div data-testid={testId}>
      <div data-testid={`${testId}-gid`}>{props.gid}</div>
      <div data-testid={`${testId}-type`}>{props.type}</div>
      <div data-testid={`${testId}-content`}>{props.content}</div>
    </div>
  )
})

export default MockComponent
