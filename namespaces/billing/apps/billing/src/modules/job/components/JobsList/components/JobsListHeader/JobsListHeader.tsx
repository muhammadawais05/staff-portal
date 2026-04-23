import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from '@toptal/picasso'

import * as S from './styles'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const JobsListHeader: FC = memo(() => {
  const { t: translate } = useTranslation('jobList')

  return (
    <TableHead>
      <TableRow>
        <TableCell css={S.headerCellId}>{translate('table.head.id')}</TableCell>
        <TableCell css={S.headerCellId}>
          {translate('table.head.engagement')}
        </TableCell>
        <TableCell css={S.headerCellTitle}>
          {translate('table.head.title')}
        </TableCell>
        <TableCell css={S.headerCellStatus}>
          {translate('table.head.status')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
})

JobsListHeader.displayName = 'JobsListHeader'

export default JobsListHeader
