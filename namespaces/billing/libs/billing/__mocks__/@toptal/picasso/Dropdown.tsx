import React from 'react'

export const Dropdown = (props: object) => {
  const testId = props['data-testid'] || 'Dropdown'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-options`}>
        {JSON.stringify(props.feeds)}
      </span>
      <span data-testid={`${testId}-content`}>{props.content}</span>
      <span data-testid={`${testId}-children`}>{props.children}</span>
    </div>
  )
}

Dropdown.Arrow = () => <span data-testid='dropdown-arrow' />

export default Dropdown
