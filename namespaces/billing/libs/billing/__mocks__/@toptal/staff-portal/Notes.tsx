import React from 'react'

const Notes = props => {
  const testId = props['data-testid'] || 'Notes'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-commentRequired`}>
        {props.commentRequired}
      </span>
      <span data-testid={`${testId}-notes`}>{JSON.stringify(props.notes)}</span>
      <span data-testid={`${testId}-refetchNotes`}>
        {JSON.stringify(props.refetchNotes)}
      </span>
      <span data-testid={`${testId}-notFoundMessage`}>
        {props.notFoundMessage}
      </span>
    </div>
  )
}

export default Notes
