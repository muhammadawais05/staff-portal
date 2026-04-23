import React, { ReactElement } from 'react'

const MockComponent = ({
  label,
  answer
}: {
  label: string
  answer: ReactElement
}) => (
  <div data-testid='quiz-item'>
    <span data-testid='quiz-item-label'>{label}</span>
    <span data-testid='quiz-item-answer'>{answer}</span>
  </div>
)

export default MockComponent
