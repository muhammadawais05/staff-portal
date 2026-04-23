import { Table } from '@toptal/picasso'
import React from 'react'

import { SkeletonColumn } from './types'

interface Props {
  columns: Readonly<SkeletonColumn[]>
}

const TableSkeletonHeader = ({ columns }: Props) => {
  return (
    <Table.Head>
      <Table.Row>
        {columns.map(columnItem => (
          <Table.Cell
            {...columnItem.props}
            css={columnItem.props?.css}
            key={columnItem.key || columnItem.title}
            data-testid={columnItem.dataTestId}
          >
            {columnItem.title}
          </Table.Cell>
        ))}
      </Table.Row>
    </Table.Head>
  )
}

export default TableSkeletonHeader
