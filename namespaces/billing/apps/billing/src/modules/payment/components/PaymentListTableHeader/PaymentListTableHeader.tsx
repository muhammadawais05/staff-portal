import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'PaymentListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const PaymentListTableHeader = () => {
  const { t: translate } = useTranslation('paymentList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.id}>{translate('table.head.id')}</TableCell>
        <TableCell css={S.status}>{translate('table.head.status')}</TableCell>
        <TableCell css={S.recipient}>
          {translate('table.head.recipient')}
        </TableCell>
        <TableCell css={S.amount}>{translate('table.head.amount')}</TableCell>
        <TableCell css={S.date}>{translate('table.head.date')}</TableCell>
        <TableCell css={S.description}>
          {translate('table.head.description')}
        </TableCell>
        <TableCell css={S.action}>{translate('table.head.actions')}</TableCell>
      </TableRow>
    </TableHead>
  )
}

PaymentListTableHeader.displayName = displayName

export default PaymentListTableHeader
