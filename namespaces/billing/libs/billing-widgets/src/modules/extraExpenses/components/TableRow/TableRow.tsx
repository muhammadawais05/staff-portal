import { Table, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import AmountWithStatusColor from '../../../commercialDocument/components/AmountWithStatusColor'
import BillingAmountTooltip from '../../../billingTable/components/BillingAmountTooltip'
import BillingTableDocuments from '../../../billingTable/components/BillingTableDocuments'
import { ExtraExpenseItemFragment } from '../../data/getExtraExpenses.graphql.types'

interface Props {
  data: ExtraExpenseItemFragment
  isEven: boolean
}
const displayName = 'TableRow'

const TableCell = Table.Cell

export const TableRow: FC<Props> = memo(
  ({ data: { commissions, invoice, payments }, isEven }) => {
    const { dueDate, amount, status } = invoice

    return (
      <Table.Row data-testid={displayName} stripeEven={isEven}>
        <TableCell>
          {dueDate && (
            <Typography as='span' data-testid='start-date'>
              {formatDateMed(dueDate)}
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <BillingAmountTooltip data={invoice}>
            <LinkWrapper
              data-testid={`${displayName}-company-link`}
              href={invoice.webResource.url}
              noUnderline
            >
              <AmountWithStatusColor
                amount={amount}
                status={status}
                data-testid={`${displayName}-company-amount`}
              />
            </LinkWrapper>
          </BillingAmountTooltip>
        </TableCell>
        <TableCell>
          <BillingTableDocuments
            data={payments}
            testid={`${displayName}-payments`}
          />
        </TableCell>
        <TableCell>
          <BillingTableDocuments
            data={commissions}
            testid={`${displayName}-commissions`}
          />
        </TableCell>
      </Table.Row>
    )
  }
)

TableRow.displayName = displayName

export default TableRow
