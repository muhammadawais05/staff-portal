import React, { ReactElement, ReactNode } from 'react'

const Section = ({
  actions,
  collapsible,
  'data-testid': testId = 'Section',
  defaultCollapsed,
  title,
  children
}: {
  actions: ReactNode
  collapsible?: boolean
  'data-testid': string
  defaultCollapsed?: boolean
  title: string
  children: ReactElement
}) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-actions`}>{actions}</div>
    <div data-testid={`${testId}-collapsible`}>{collapsible?.toString()}</div>
    <div data-testid={`${testId}-defaultCollapsed`}>
      {defaultCollapsed?.toString()}
    </div>
    <div data-testid={`${testId}-title`}>{title}</div>
    {children}
  </div>
)

export default Section
