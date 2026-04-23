import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'MyExpectedCommissionsListTableHeader'

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const MyExpectedCommissionsListTableHeader = () => {
  const { t: translate } = useTranslation('expectedCommissions')

  return (
    <TableHead data-testid={`${displayName}-head`}>
      <TableRow>
        <TableCell css={S.dateCell}>
          {translate('table.head.expectedDate')}
        </TableCell>
        <TableCell css={S.amountCell}>
          {translate('table.head.amount')}
        </TableCell>
        <TableCell css={S.payeeCell}>
          {translate('table.head.company')}
        </TableCell>
        <TableCell css={S.payeeCell}>{translate('table.head.job')}</TableCell>
        <TableCell css={S.descriptionCell}>
          {translate('table.head.description')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

MyExpectedCommissionsListTableHeader.displayName = displayName

export default MyExpectedCommissionsListTableHeader
