import { Table, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import * as S from './styles'
import BillingCommissions from '../../../billingTable/components/BillingCommissions'
import BillingDocument from '../../../billingTable/components/BillingTableDocument'
import { PlacementFeeItemFragment } from '../../data/getPlacementFees.graphql.types'

interface Props {
  data: PlacementFeeItemFragment
  isEven: boolean
}

const displayName = 'TableRow'

const TableCell = Table.Cell

const TableRow: FC<Props> = memo(
  ({ data: { invoice, commissions }, isEven }) => {
    const isTall = commissions?.nodes?.length > 1
    const { dueDate, description } = invoice

    return (
      <Table.Row data-testid={displayName} stripeEven={isEven}>
        <TableCell css={S.cellDueDate({ isTall })} data-testid='due-date'>
          {dueDate && <Typography>{formatDateMed(dueDate)}</Typography>}
        </TableCell>
        <TableCell css={S.cellCompany({ isTall })} data-testid='invoice'>
          <BillingDocument
            document={invoice}
            testid={`${displayName}-invoice`}
          />
        </TableCell>
        <TableCell
          css={S.cellCommissions({ isTall })}
          data-testid='commissions'
        >
          <BillingCommissions
            commissions={commissions?.nodes}
            testid={`${displayName}-commissions`}
          />
        </TableCell>
        <TableCell
          css={S.cellDescription({ isTall })}
          data-testid='description'
        >
          <Typography>{description}</Typography>
        </TableCell>
      </Table.Row>
    )
  }
)

TableRow.displayName = displayName

export default TableRow
