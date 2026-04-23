import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'ExpectedCommissionsListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const ExpectedCommissionsListTableHeader = () => {
  const { t: translate } = useTranslation('expectedCommissionList')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.dateCell}>
          {translate('table.head.expectedDate')}
        </TableCell>
        <TableCell css={S.amountCell}>
          {translate('table.head.amount')}
        </TableCell>
        <TableCell css={S.payeeCell}>{translate('table.head.payee')}</TableCell>
        <TableCell css={S.descriptionCell}>
          {translate('table.head.description')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

ExpectedCommissionsListTableHeader.displayName = displayName

export default ExpectedCommissionsListTableHeader
