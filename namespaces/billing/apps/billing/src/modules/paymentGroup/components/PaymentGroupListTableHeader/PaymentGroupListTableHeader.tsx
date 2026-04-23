import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'PaymentGroupListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const PaymentGroupListTableHeader = () => {
  const { t: translate } = useTranslation('paymentGroupList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.idCell}>{translate('table.head.id')}</TableCell>
        <TableCell css={S.statusCell}>
          {translate('table.head.status')}
        </TableCell>
        <TableCell css={S.payeeCell}>{translate('table.head.payee')}</TableCell>
        <TableCell css={S.amountCell}>
          {translate('table.head.amount')}
        </TableCell>
        <TableCell css={S.dateCell}>{translate('table.head.date')}</TableCell>
        <TableCell css={S.action}>{translate('table.head.actions')}</TableCell>
      </TableRow>
    </TableHead>
  )
}

PaymentGroupListTableHeader.displayName = displayName

export default PaymentGroupListTableHeader
