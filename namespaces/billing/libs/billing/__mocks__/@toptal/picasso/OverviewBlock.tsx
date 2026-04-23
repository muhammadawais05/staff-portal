import React from 'react'

const OverviewBlock = props => {
  const testId = props['data-testid'] || 'OverviewBlock'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-value`}>{props.value}</span>
      <span data-testid={`${testId}-label`}>{props.label}</span>
      <span data-testid={`${testId}-variant`}>{props.variant}</span>
    </div>
  )
}

const Group = props => (
  <div data-testid={props['data-testid'] || 'OverviewBlock.Group'}>
    {props.children}
  </div>
)

const Row = props => (
  <div data-testid={props['data-testid'] || 'OverviewBlock.Row'}>
    {props.children}
  </div>
)

OverviewBlock.Group = Group
OverviewBlock.Row = Row

export default OverviewBlock
