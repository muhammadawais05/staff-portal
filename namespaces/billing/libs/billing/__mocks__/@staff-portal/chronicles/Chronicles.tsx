import React, { ReactElement } from 'react'

const Chronicles = ({
  'data-testid': testId = 'Chronicles',
  children,
  feeds
}: {
  'data-testid': string
  children: ReactElement
  feeds: string[][]
}) => (
  <div data-testid={testId}>
    <span data-testid={`${testId}-options`}>{JSON.stringify(feeds)}</span>
    <span data-testid={`${testId}-children`}>{children}</span>
  </div>
)

export default Chronicles
