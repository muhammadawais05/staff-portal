import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'TransfersTableHead'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const TransfersTableHead = () => {
  const { t: translate } = useTranslation('transfers')

  return (
    <TableHead data-testid={displayName}>
      <TableRow>
        <TableCell css={S.status} data-testid={`${displayName}-status`}>
          {translate('table.status')}
        </TableCell>
        <TableCell css={S.payment} data-testid={`${displayName}-paymentMethod`}>
          {translate('table.paymentMethod')}
        </TableCell>
        <TableCell css={S.amount} data-testid={`${displayName}-amount`}>
          {translate('table.amount')}
        </TableCell>
        <TableCell css={S.date} data-testid={`${displayName}-date`}>
          {translate('table.date')}
        </TableCell>
        <TableCell css={S.details} data-testid={`${displayName}-details`}>
          {translate('table.details')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

TransfersTableHead.displayName = displayName

export default TransfersTableHead
