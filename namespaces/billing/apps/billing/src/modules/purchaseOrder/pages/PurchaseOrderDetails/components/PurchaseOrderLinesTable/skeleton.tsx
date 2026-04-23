import React from 'react'
import { Table, SkeletonLoader } from '@toptal/picasso'

const PurchaseOrderLinesTableSkeleton = () => (
  <Table
    style={{ tableLayout: 'fixed' }}
    data-testid='PurchaseOrderLinesTableSkeleton'
  >
    <Table.Body>
      {Array.from({ length: 3 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Table.Row key={index} stripeEven={Boolean(index % 2)}>
          <Table.Cell>
            <SkeletonLoader.Typography />
          </Table.Cell>
          <Table.Cell>
            <SkeletonLoader.Typography />
          </Table.Cell>
          <Table.Cell>
            <SkeletonLoader.Typography />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

PurchaseOrderLinesTableSkeleton.displayName = 'PurchaseOrderLinesTableSkeleton'

export default PurchaseOrderLinesTableSkeleton
