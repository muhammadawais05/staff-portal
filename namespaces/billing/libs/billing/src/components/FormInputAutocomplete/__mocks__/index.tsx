import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const testId = props['data-testid'] || 'FormInputAutocomplete'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-label`}>{props.label}</span>
      <span data-testid={`${testId}-model`}>{props.model}</span>
      <span data-testid={`${testId}-name`}>{props.name}</span>
      <span data-testid={`${testId}-width`}>{props.width}</span>
    </div>
  )
})

export default MockComponent
