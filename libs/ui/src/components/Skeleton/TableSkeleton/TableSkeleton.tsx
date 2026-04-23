import React, { memo } from 'react'
import { Table, TableProps } from '@toptal/picasso'

import TableSkeletonHeader from './TableSkeletonHeader'
import { SkeletonColumn, RowItem } from './types'
import { getColumns, getRows, getSkeletonComponent } from './utils'

export interface Props extends Omit<TableProps, 'children'> {
  rows: number | RowItem[]
  cols: number | Readonly<SkeletonColumn[]>
  dataTestId?: string
  showHeader?: boolean
}

const TableSkeleton = ({
  rows,
  cols,
  variant,
  dataTestId,
  showHeader = true
}: Props) => {
  const colList = getColumns(cols)
  const rowList = getRows(rows)

  return (
    <Table data-testid={dataTestId} variant={variant}>
      {showHeader && <TableSkeletonHeader columns={colList} />}
      <Table.Body>
        {rowList.map(rowItem => (
          <Table.Row key={rowItem.key}>
            {colList.map(colItem => {
              const SkeletonComponent = getSkeletonComponent(colItem)

              return (
                <Table.Cell
                  {...colItem.props}
                  key={colItem.key || colItem.title}
                  css={colItem.props?.css}
                  data-testid={colItem.bodyDataTestId}
                >
                  <SkeletonComponent {...colItem.skeletonProps} />
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default memo(TableSkeleton)
