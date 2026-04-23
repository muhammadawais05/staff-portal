import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'MemorandumListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const MemorandumListTableHeader = () => {
  const { t: translate } = useTranslation('memorandumList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.id} data-testid={`${displayName}-id`}>
          {translate('table.head.id')}
        </TableCell>
        <TableCell css={S.balance} data-testid={`${displayName}-balance`}>
          {translate('table.head.balance')}
        </TableCell>
        <TableCell css={S.receiver} data-testid={`${displayName}-receiver`}>
          {translate('table.head.receiver')}
        </TableCell>
        <TableCell css={S.amount} data-testid={`${displayName}-amount`}>
          {translate('table.head.amount')}
        </TableCell>
        <TableCell css={S.date} data-testid={`${displayName}-date`}>
          {translate('table.head.date')}
        </TableCell>
        <TableCell css={S.details} data-testid={`${displayName}-details`}>
          {translate('table.head.details')}
        </TableCell>
        <TableCell css={S.action} data-testid={`${displayName}-actions`}>
          {translate('table.head.actions')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

MemorandumListTableHeader.displayName = displayName

export default MemorandumListTableHeader
