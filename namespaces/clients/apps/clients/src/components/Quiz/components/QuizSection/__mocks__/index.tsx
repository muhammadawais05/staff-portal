import React, { ReactNode } from 'react'

const MockComponent = ({
  children,
  defaultCollapsed = false
}: {
  children: ReactNode
  defaultCollapsed?: boolean
}) => (
  <div data-testid='QuizSection'>
    <span data-testid='QuizSection-children'>{children}</span>
    <span data-testid='QuizSection-defaultCollapsed'>
      {defaultCollapsed.toString()}
    </span>
  </div>
)

export default MockComponent
