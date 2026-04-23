import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = 'TableHead'

const TableCell = Table.Cell

export const TableHead: FC = memo(() => {
  const { t: translate } = useTranslation('billingCycleTable')

  return (
    <Table.Head data-testid='BillingCycleTableHead'>
      <Table.Row>
        <TableCell css={S.headerCell}> </TableCell>
        <TableCell css={S.headerCell}>
          {translate('TableHead.startDate')}
        </TableCell>
        <TableCell css={S.headerCell}>
          {translate('TableHead.endDate')}
        </TableCell>
        <TableCell css={S.headerCell}>{translate('TableHead.type')}</TableCell>
        <TableCell css={S.headerCell}>
          {translate('TableHead.commitment')}
        </TableCell>
        <TableCell css={S.headerCell}>{translate('TableHead.hours')}</TableCell>
        <TableCell css={S.headerCell}>
          {translate('TableHead.company')}
        </TableCell>
        <TableCell css={S.headerCell}>
          {translate('TableHead.talent')}
        </TableCell>
        <TableCell css={S.headerCell}>
          {translate('TableHead.commissions')}
        </TableCell>
      </Table.Row>
    </Table.Head>
  )
})

TableHead.displayName = displayName

export default TableHead
