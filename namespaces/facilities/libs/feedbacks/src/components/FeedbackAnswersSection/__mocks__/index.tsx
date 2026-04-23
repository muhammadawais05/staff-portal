import React, { ReactNode } from 'react'

const MockComponent = ({
  title,
  answers,
  actionButton,
  'data-testid': testId
}: {
  title: string
  answers: string[]
  actionButton?: ReactNode
  'data-testid'?: string
}) => (
  <div data-testid={testId}>
    <span data-testid={`${testId}-title`}>{title}</span>
    <span data-testid={`${testId}-answers`}>{JSON.stringify(answers)}</span>
    <span data-testid={`${testId}-actionButton`}>{actionButton}</span>
  </div>
)

export default MockComponent
