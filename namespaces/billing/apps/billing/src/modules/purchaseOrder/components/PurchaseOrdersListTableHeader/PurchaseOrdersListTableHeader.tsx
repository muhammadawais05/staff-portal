import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'PurchaseOrdersListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

interface Props {
  poLinesEnabled?: boolean
}

const PurchaseOrdersListTableHeader = ({ poLinesEnabled = false }: Props) => {
  const { t: translate } = useTranslation('purchaseOrderList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.numberCell}>
          {translate('table.head.number')}
        </TableCell>
        <TableCell css={S.companyCell}>
          {translate('table.head.company')}
        </TableCell>
        <TableCell css={S.amountCell}>
          {poLinesEnabled
            ? translate('table.head.totalAmount')
            : translate('table.head.amount')}
        </TableCell>
        <TableCell css={S.amountCell}>
          {translate('table.head.invoicedTotal')}
        </TableCell>
        <TableCell css={poLinesEnabled ? S.amountCell : S.thresholdCell}>
          {poLinesEnabled
            ? translate('table.head.draftedTotal')
            : translate('table.head.threshold')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

PurchaseOrdersListTableHeader.displayName = displayName

export default PurchaseOrdersListTableHeader
