import React, { ReactElement, ReactNode } from 'react'

const OverviewBlock = ({
  label,
  variant,
  value,
  'data-testid': testId = 'OverviewBlock'
}: {
  'data-testid': string
  value: ReactNode
  label: string
  variant?: string
}) => {
  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-label`}>{label}</span>
      <span data-testid={`${testId}-value`}>{value}</span>
      <span data-testid={`${testId}-variant`}>{variant}</span>
    </div>
  )
}

const Group = ({
  'data-testid': testId = 'OverviewBlock.Group',
  children
}: {
  'data-testid': string
  children: ReactElement
}) => <div data-testid={testId}>{children}</div>

const Row = ({
  'data-testid': testId = 'OverviewBlock.Group',
  children
}: {
  'data-testid': string
  children: ReactElement
}) => <div data-testid={testId}>{children}</div>

OverviewBlock.Group = Group
OverviewBlock.Row = Row

export default OverviewBlock
