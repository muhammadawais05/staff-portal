import React from 'react'
import { Table, SkeletonLoader } from '@toptal/picasso'

const TableRow = Table.Row

const JobsListSkeleton = () => (
  <Table style={{ tableLayout: 'fixed' }} data-testid='JobsListSkeleton'>
    <Table.Body>
      {Array.from({ length: 3 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={index} stripeEven={Boolean(index % 2)}>
          <Table.Cell>
            <SkeletonLoader.Typography />
          </Table.Cell>
          <Table.Cell>
            <SkeletonLoader.Typography />
          </Table.Cell>
          <Table.Cell>
            <SkeletonLoader.Typography />
          </Table.Cell>
        </TableRow>
      ))}
    </Table.Body>
  </Table>
)

JobsListSkeleton.displayName = 'JobsListSkeleton'

export default JobsListSkeleton
