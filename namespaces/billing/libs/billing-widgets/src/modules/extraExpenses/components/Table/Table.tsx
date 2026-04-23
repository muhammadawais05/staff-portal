import { Container, Table as PicassoTable } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import {
  BillingCycle,
  BillingEngagementDocuments
} from '@staff-portal/graphql/staff'

import { ExtraExpenseConnectionFragment } from '../../data/getExtraExpenses.graphql.types'
import TableFooterRow from '../TableFooterRow'
import TableHead from '../TableHead'
import TableRow from '../TableRow'

export type BillingCycleWithDocs = BillingCycle & BillingEngagementDocuments

interface Props {
  data: ExtraExpenseConnectionFragment
}

const displayName = 'Table'

const TableBody = PicassoTable.Body
const TableFooter = PicassoTable.Footer

export const Table: FC<Props> = memo(
  ({ data: { nodes, extraExpenseTotals } }) => (
    <Container bottom={2} data-testid={displayName}>
      <PicassoTable>
        <TableHead />
        <TableBody>
          {nodes.map((data, index) => (
            <TableRow
              data={data}
              key={data.invoice.id}
              isEven={Boolean(index % 2)}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableFooterRow data={extraExpenseTotals} type='paid' />
          <TableFooterRow data={extraExpenseTotals} type='debit' />
          <TableFooterRow data={extraExpenseTotals} type='credit' />
        </TableFooter>
      </PicassoTable>
    </Container>
  )
)

Table.displayName = displayName

export default Table
