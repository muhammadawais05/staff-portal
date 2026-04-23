import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'ReceivedPaymentsListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const ReceivedPaymentsListTableHeader = () => {
  const { t: translate } = useTranslation('paymentList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.id}>{translate('table.head.id')}</TableCell>
        <TableCell css={S.status}>{translate('table.head.status')}</TableCell>
        <TableCell css={S.amount}>{translate('table.head.amount')}</TableCell>
        <TableCell css={S.date}>{translate('table.head.created')}</TableCell>
        <TableCell css={S.date}>{translate('table.head.paidDate')}</TableCell>
        <TableCell css={S.description}>
          {translate('table.head.description')}
        </TableCell>
        <TableCell css={S.action}>{translate('table.head.actions')}</TableCell>
      </TableRow>
    </TableHead>
  )
}

ReceivedPaymentsListTableHeader.displayName = displayName

export default ReceivedPaymentsListTableHeader
