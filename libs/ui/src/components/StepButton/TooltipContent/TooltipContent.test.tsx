import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import TooltipContent, { Props } from './TooltipContent'

const arrangeTest = (
  stepName: Props['stepName'],
  messages?: Props['messages']
) => {
  render(<TooltipContent stepName={stepName} messages={messages} />)
}

describe('TooltipContent', () => {
  const stepName = 'Step name'
  const messages = ['first', 'second']

  it('shows step name', () => {
    arrangeTest(stepName)

    expect(screen.getByText(stepName)).toBeInTheDocument()
  })

  it('shows step name and a list of messages', () => {
    arrangeTest(stepName, messages)

    expect(screen.getByText(stepName)).toBeInTheDocument()
    expect(screen.getByText(messages[0])).toBeInTheDocument()
    expect(screen.getByText(messages[1])).toBeInTheDocument()
  })

  it('shows step name and a list of one message', () => {
    const [message] = messages

    arrangeTest(stepName, message)

    expect(screen.getByText(stepName)).toBeInTheDocument()
    expect(screen.getByText(messages[0])).toBeInTheDocument()
  })
})
