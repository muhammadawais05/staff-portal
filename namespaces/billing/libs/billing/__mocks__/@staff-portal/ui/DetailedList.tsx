import React from 'react'

const DetailedList = props => {
  const testId = props['data-testid'] || 'DetailedList'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-columns`}>{props.columns}</span>
      <span data-testid={`${testId}-items`}>{JSON.stringify(props.items)}</span>
      <span data-testid={`${testId}-labelColumnWidth`}>
        {props.labelColumnWidth}
      </span>
      <span data-testid={`${testId}-striped`}>
        {JSON.stringify(props.striped)}
      </span>
    </div>
  )
}

export default DetailedList
