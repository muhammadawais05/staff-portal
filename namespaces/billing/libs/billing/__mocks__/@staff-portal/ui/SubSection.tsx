import React from 'react'

const SubSection = props => {
  const testId = props['data-testid'] || 'DetailedList'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-title`}>{props.title}</span>
      <span data-testid={`${testId}-actions`}>{props.actions}</span>
      {props.children}
    </div>
  )
}

export default SubSection
