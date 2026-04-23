import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'PaymentGroupPaymentsTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const PaymentGroupPaymentsTableHeader = () => {
  const { t: translate } = useTranslation('paymentList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.idCell}>{translate('table.head.id')}</TableCell>
        <TableCell css={S.statusCell}>
          {translate('table.head.status')}
        </TableCell>
        <TableCell css={S.amountCell}>
          {translate('table.head.amount')}
        </TableCell>
        <TableCell css={S.dateCell}>
          {translate('table.head.created')}
        </TableCell>
        <TableCell css={S.serviceCell}>
          {translate('table.head.service')}
        </TableCell>
        <TableCell css={S.action}>{translate('table.head.actions')}</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default PaymentGroupPaymentsTableHeader
