import React, { ReactElement } from 'react'

const MockComponent = ({
  columns,
  striped,
  labelColumnWidth,
  children,
  items
}: {
  columns: number
  labelColumnWidth: number
  striped: boolean
  children: ReactElement
  items: unknown[]
}) => (
  <div
    data-testid='DetailedList'
    data-columns={columns}
    data-striped={striped}
    data-label-column-width={labelColumnWidth}
  >
    <span data-testid='DetailedList-children'>{children}</span>
    <span data-testid='DetailedList-items'>{JSON.stringify(items)}</span>
  </div>
)

export default MockComponent
