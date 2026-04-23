import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

const displayName = 'PlacementFeesTableHead'

const TableRow = Table.Row
const TableCell = Table.Cell

const TableHead: FC = memo(() => {
  const { t: translate } = useTranslation('placementFees')

  return (
    <Table.Head data-testid={displayName}>
      <TableRow>
        <TableCell>{translate('Table.TableHead.dueDate')}</TableCell>
        <TableCell>{translate('Table.TableHead.amount')}</TableCell>
        <TableCell>{translate('Table.TableHead.commissions')}</TableCell>
        <TableCell>{translate('Table.TableHead.description')}</TableCell>
      </TableRow>
    </Table.Head>
  )
})

TableHead.displayName = displayName

export default TableHead
