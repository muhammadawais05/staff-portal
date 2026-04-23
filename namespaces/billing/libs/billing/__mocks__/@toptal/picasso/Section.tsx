import React from 'react'

const Section = props => {
  const testId = props['data-testid'] || 'Section'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-title`}>{props.title}</span>
      <span data-testid={`${testId}-actions`}>{props.actions}</span>
      <span data-testid={`${testId}-variant`}>{props.variant}</span>
      <span data-testid={`${testId}-subtitle`}>{props.subtitle}</span>
      {props.children}
    </div>
  )
}

export default Section
