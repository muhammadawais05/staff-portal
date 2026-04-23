import React, { ReactNode } from 'react'

const MockComponent = ({
  divided,
  striped,
  children
}: {
  children?: ReactNode
  striped?: boolean
  divided?: boolean
}) => (
  <div data-testid='DetailedListRow'>
    <div data-testid='DetailedListRow-divided'>{divided?.toString()}</div>
    <div data-testid='DetailedListRow-striped'>{striped?.toString()}</div>
    <div data-testid='DetailedListRow-children'>{children}</div>
  </div>
)

export default MockComponent
