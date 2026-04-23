import React, { ReactNode } from 'react'

const MockComponent = ({
  label,
  isFullWidthLabel,
  hasHalfWidthItems,
  value,
  'data-testid': dataTestId
}: {
  label: NonNullable<ReactNode>
  isFullWidthLabel?: boolean
  hasHalfWidthItems?: boolean
  value?: ReactNode
  'data-testid'?: string
}) => {
  const testId = dataTestId || 'DetailedListItem'

  return (
    <div data-testid={testId}>
      <div data-testid={`${testId}-label`}>{label}</div>
      <div data-testid={`${testId}-isFullWidthLabel`}>
        {isFullWidthLabel?.toString()}
      </div>
      <div data-testid={`${testId}-hasHalfWidthItems`}>
        {hasHalfWidthItems?.toString()}
      </div>
      <div data-testid={`${testId}-value`}>{value}</div>
    </div>
  )
}

export default MockComponent
