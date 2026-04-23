import React, { ReactNode } from 'react'
import { Operation } from '@staff-portal/graphql/staff'

const MockComponent = ({
  initialOperation,
  hidden = false,
  inline,
  children,
  disableTooltip
}: {
  initialOperation?: Operation | null
  hidden?: boolean
  inline?: boolean
  children: (props: {}) => ReactNode
  disableTooltip?: boolean
}) => (
  <div data-testid='LazyOperation'>
    <div data-testid='LazyOperation-initialOperation'>
      {JSON.stringify(initialOperation)}
    </div>
    <div data-testid='LazyOperation-hidden'>{hidden?.toString()}</div>
    <div data-testid='LazyOperation-inline'>{inline?.toString()}</div>
    <div data-testid='LazyOperation-disableTooltip'>
      {disableTooltip?.toString()}
    </div>
    <div data-testid='LazyOperation-children'>{children({})}</div>
  </div>
)

export default MockComponent
