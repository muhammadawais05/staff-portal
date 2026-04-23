import React from 'react'

const TaskCardLayout = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout'}>
    {props.children}
  </div>
)

const Summary = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.Summary'}>
    {props.children}
  </div>
)

const SummaryItem = props => {
  const testId = props['data-testid'] || 'TaskCardLayout.SummaryItem'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-label`}>{props.label}</span>
      <span data-testid={`${testId}-value`}>{props.value}</span>
      {props.variant && (
        <span data-testid={`${testId}-variant`}>{props.variant}</span>
      )}
    </div>
  )
}

const Content = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.Content'} />
)

const Header = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.Header'}>
    {props.children}
  </div>
)

const Description = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.Description'}>
    {props.children}
  </div>
)

const DescriptionFormatter = props => (
  <div
    data-testid={props['data-testid'] || 'TaskCardLayout.DescriptionFormatter'}
  >
    {JSON.stringify(props)}
  </div>
)

const Title = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.Title'}>
    {props.children}
  </div>
)

const Actions = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.Actions'}>
    {props.children}
  </div>
)

const MoreButton = props => (
  <div data-testid={props['data-testid'] || 'TaskCardLayout.MoreButton'}>
    {props.children}
  </div>
)

TaskCardLayout.Actions = Actions
TaskCardLayout.Content = Content
TaskCardLayout.Description = Description
TaskCardLayout.DescriptionFormatter = DescriptionFormatter
TaskCardLayout.Header = Header
TaskCardLayout.MoreButton = MoreButton
TaskCardLayout.Summary = Summary
TaskCardLayout.SummaryItem = SummaryItem
TaskCardLayout.Title = Title

export default TaskCardLayout
