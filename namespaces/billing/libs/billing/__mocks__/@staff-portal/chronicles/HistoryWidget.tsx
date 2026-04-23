import React, { ReactNode } from 'react'

const HistoryWidget = ({
  'data-testid': testId = 'HistoryWidget',
  feeds,
  emptyState,
  pollInterval,
  limit
}: {
  'data-testid': string
  feeds: string[][]
  emptyState: {
    children: ReactNode
  }
  pollInterval: number
  limit: number
}) => (
  <div data-testid={testId}>
    <span data-testid={`${testId}-feeds`}>{JSON.stringify(feeds)}</span>
    <div data-testid={`${testId}-limit`}>{limit}</div>
    <div data-testid={`${testId}-pollInterval`}>{pollInterval}</div>
    <div data-testid={`${testId}-emptyState`}>{emptyState.children}</div>
  </div>
)

export default HistoryWidget
