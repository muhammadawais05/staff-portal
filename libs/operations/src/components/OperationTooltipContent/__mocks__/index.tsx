import React from 'react'

type Props = {
  messages: string[]
  'data-testid'?: string
}

const MockComponent = ({
  messages,
  'data-testid': testId = 'OperationTooltipContent'
}: Props) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-messages`}>{JSON.stringify(messages)}</div>
  </div>
)

export default MockComponent
