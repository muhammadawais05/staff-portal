import React, { ReactNode } from 'react'

type Props = {
  content?: ReactNode
  children?: ReactNode
}

const MockComponent = ({
  content,
  children,
  'data-testid': testId = 'LazyTooltip'
}: Props & { 'data-testid'?: string }) => {
  return (
    <div data-testid={testId}>
      <div data-testid={`${testId}-content`}>{content}</div>
      <div data-testid={`${testId}-children`}>{children}</div>
    </div>
  )
}

export default MockComponent
