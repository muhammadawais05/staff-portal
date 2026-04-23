import React, { memo, FC, HTMLAttributes, ReactElement } from 'react'
import { Table, SkeletonLoader, Section } from '@toptal/picasso'

const displayName = 'TableSkeleton'

interface RowProps {
  isEven: boolean
  column: number
}

const Row = ({ isEven, column }: RowProps) => {
  return (
    <Table.Row data-testid={`${displayName}-row`} stripeEven={isEven}>
      {Array.from({ length: column }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Table.Cell key={index} data-testid={`${displayName}-cell`}>
          <SkeletonLoader.Typography />
        </Table.Cell>
      ))}
    </Table.Row>
  )
}

interface Props extends HTMLAttributes<HTMLTableElement> {
  row?: number
  column?: number
  title?: string
  actions?: ReactElement
}

const TableSkeleton: FC<Props> = memo<Props>(
  ({ children, row = 3, column = 5, title = '', actions, ...rest }) => {
    const table = (
      <Table style={{ tableLayout: 'fixed' }} {...rest}>
        {children}
        <Table.Body>
          {Array.from({ length: row }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Row key={index} isEven={Boolean(index % 2)} column={column} />
          ))}
        </Table.Body>
      </Table>
    )

    return title ? (
      <Section title={title} actions={actions}>
        {table}
      </Section>
    ) : (
      table
    )
  }
)

export default TableSkeleton
