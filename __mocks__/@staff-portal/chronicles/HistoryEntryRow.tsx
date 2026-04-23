import React, { ReactElement, ReactNode } from 'react'

interface Props {
  'data-testid': string
  children: ReactElement
  id: string
  icon?: JSX.Element
  content: (string | JSX.Element)[]
  comment: ReactNode | null
  date: string
  expanded: boolean
}

const HistoryEntryRow = ({
  'data-testid': testId = 'HistoryEntryRow',
  children,
  id,
  icon,
  content,
  comment,
  date,
  expanded
}: Props) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-children`}>{children}</div>
    <div data-testid={`${testId}-id`}>{id}</div>
    <div data-testid={`${testId}-icon`}>{icon}</div>
    <div data-testid={`${testId}-content`}>{content}</div>
    {expanded && <div data-testid={`${testId}-comment`}>{comment}</div>}
    <div data-testid={`${testId}-date`}>{date}</div>
    <div data-testid={`${testId}-expanded`}>{JSON.stringify(expanded)}</div>
  </div>
)

export default HistoryEntryRow
