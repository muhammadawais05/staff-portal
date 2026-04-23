import { Amount, Table, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import {
  EMPTY_DATA,
  formatAsPercentage
} from '@staff-portal/billing/src/_lib/helpers'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'

import { PurchaseOrderListItemFragment } from '../../../__fragments__/purchaseOrderListItemFragment.graphql.types'
import { getColorByValues } from '../../utils'
import PurchaseOrdersListTableCellNumber from '../PurchaseOrdersListTableCellNumber'
import * as S from './styles'

const displayName = 'PurchaseOrdersListTableRow'

interface Props {
  purchaseOrder: PurchaseOrderListItemFragment
  isEven: boolean
  poLinesEnabled?: boolean
}

const TableRow = Table.Row
const TableCell = Table.Cell

const PurchaseOrdersListTableRow: FC<Props> = memo<Props>(
  ({ purchaseOrder, isEven, poLinesEnabled = false }) => {
    const { client, invoicedAmount, threshold, draftedAmount, totalAmount } =
      purchaseOrder

    return (
      <TableRow
        data-testid={`${displayName}-purchase-order`}
        stripeEven={isEven}
      >
        <TableCell data-testid={`${displayName}-ponumber`}>
          <PurchaseOrdersListTableCellNumber purchaseOrder={purchaseOrder} />
        </TableCell>
        <TableCell data-testid={`${displayName}-company`}>
          <WebResourceLinkWrapper inline webResource={client.webResource} />
        </TableCell>
        <TableCell
          data-testid={`${displayName}-totalAmount`}
          css={S.amountCell}
        >
          <Typography>
            {totalAmount ? <Amount amount={totalAmount} /> : EMPTY_DATA}
          </Typography>
        </TableCell>
        <TableCell
          data-testid={`${displayName}-invoicedAmount`}
          css={S.amountCell}
        >
          <Amount
            data-testid={`${displayName}-invoicedAmount-text`}
            amount={invoicedAmount}
            color={getColorByValues({
              threshold,
              invoicedAmount,
              totalAmount
            })}
          />
        </TableCell>
        {poLinesEnabled ? (
          <TableCell
            data-testid={`${displayName}-draftedTotal`}
            css={S.amountCell}
          >
            <Typography>
              {draftedAmount ? <Amount amount={draftedAmount} /> : EMPTY_DATA}
            </Typography>
          </TableCell>
        ) : (
          <TableCell data-testid={`${displayName}-threshold`}>
            <Typography>
              {threshold ? formatAsPercentage(threshold) : EMPTY_DATA}
            </Typography>
          </TableCell>
        )}
      </TableRow>
    )
  }
)

PurchaseOrdersListTableRow.displayName = displayName

export default PurchaseOrdersListTableRow
