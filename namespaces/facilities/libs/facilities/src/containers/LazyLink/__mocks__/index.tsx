import React, { ReactNode } from 'react'
import { UrlWithMessages } from '@staff-portal/graphql/staff'

const MockComponent = ({
  initialLink,
  hidden = false,
  inline,
  children,
  disableTooltip
}: {
  initialLink?: UrlWithMessages | null
  hidden?: boolean
  inline?: boolean
  children: (props: {}) => ReactNode
  disableTooltip?: boolean
}) => (
  <div data-testid='LazyLink'>
    <div data-testid='LazyLink-initialLink'>{JSON.stringify(initialLink)}</div>
    <div data-testid='LazyLink-hidden'>{hidden?.toString()}</div>
    <div data-testid='LazyLink-inline'>{inline?.toString()}</div>
    <div data-testid='LazyLink-disableTooltip'>
      {disableTooltip?.toString()}
    </div>
    <div data-testid='LazyLink-children'>{children({})}</div>
  </div>
)

export default MockComponent
