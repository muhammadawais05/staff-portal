import { Amount, Table, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import { ExpectedCommissionFragment } from '../../../__fragments__/expectedCommissionFragment.graphql.types'
import ExpectedCommissionShortDescription from '../ExpectedCommissionShortDescription'
import * as S from './styles'

const displayName = 'ExpectedCommissionsListTableRow'

export interface ExpectedCommissionsListTableRowProps {
  expectedCommission: ExpectedCommissionFragment
  isEven: boolean
}

const TableRow = Table.Row
const TableCell = Table.Cell

const ExpectedCommissionsListTableRow: FC<ExpectedCommissionsListTableRowProps> =
  memo<ExpectedCommissionsListTableRowProps>(
    ({ isEven, expectedCommission }) => {
      const { expectedDate, id, amount, subject } = expectedCommission

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
              data-testid={`${displayName}-payee`}
              webResource={subject.webResource}
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

ExpectedCommissionsListTableRow.displayName = displayName

export default ExpectedCommissionsListTableRow
