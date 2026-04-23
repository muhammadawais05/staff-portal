import { Amount, Table, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import ExpectedCommissionShortDescription from '../ExpectedCommissionShortDescription'
import * as S from './styles'
import { MyExpectedCommissionFragment } from '../../data/getMyExpectedCommissionsList.graphql.types'

const displayName = 'MyExpectedCommissionsListTableRow'

type Props = {
  expectedCommission: MyExpectedCommissionFragment
  isEven: boolean
}

const TableRow = Table.Row
const TableCell = Table.Cell

const MyExpectedCommissionsListTableRow: FC<Props> = memo<Props>(
  ({ isEven, expectedCommission }) => {
    const {
      expectedDate,
      id,
      amount,
      client,
      invoiceReasonEngagement,
      invoiceReasonJob
    } = expectedCommission
    const job = invoiceReasonEngagement?.job || invoiceReasonJob

    return (
      <TableRow
        data-testid={`${displayName}-expectedCommission-${id}`}
        stripeEven={isEven}
      >
        <TableCell>
          <Typography data-testid={`${displayName}-expectedDate`}>
            {formatDateMed(expectedDate)}
          </Typography>
        </TableCell>
        <TableCell css={S.amountCell}>
          <Amount data-testid={`${displayName}-amount`} amount={amount} />
        </TableCell>
        <TableCell>
          <WebResourceLinkWrapper
            data-testid={`${displayName}-company`}
            webResource={client?.webResource}
          />
        </TableCell>
        <TableCell>
          <WebResourceLinkWrapper
            data-testid={`${displayName}-job`}
            webResource={job?.webResource}
          />
        </TableCell>
        <TableCell>
          <Typography data-testid={`${displayName}-description`}>
            <ExpectedCommissionShortDescription
              expectedCommission={expectedCommission}
            />
          </Typography>
        </TableCell>
      </TableRow>
    )
  }
)

MyExpectedCommissionsListTableRow.displayName = displayName

export default MyExpectedCommissionsListTableRow
