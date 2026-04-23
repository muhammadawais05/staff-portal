import React, { ReactElement, ReactNode } from 'react'

interface Props {
  emptyOnError?: boolean
  errorComponent?: ReactElement
  bubbleUpError?: boolean
  children: ReactNode
}

const WidgetErrorBoundary = ({
  children,
  emptyOnError,
  errorComponent,
  bubbleUpError
}: Props) => {
  return <div data-testid='WidgetErrorBoundary'>
    <span data-testid='WidgetErrorBoundary-emptyOnError'>{emptyOnError}</span>
    <span data-testid='WidgetErrorBoundary-errorComponent'>
      {errorComponent}
    </span>
    <span data-testid='WidgetErrorBoundary-bubbleUpError'>{bubbleUpError}</span>
    <span data-testid='WidgetErrorBoundary-children'>{children}</span>
  </div>
}

export default WidgetErrorBoundary
