import { Amount, Table, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Totals } from '@staff-portal/graphql/staff'

interface Props {
  totals: Totals
}

const displayName = 'TableFooter'

const TableRow = Table.Row
const TableCell = Table.Cell

const TableFooter: FC<Props> = memo(
  ({
    totals: {
      paidCompany,
      paidCommissions,
      debitCompany,
      debitCommissions,
      creditCompany,
      creditCommissions
    }
  }) => {
    const { t: translate } = useTranslation('placementFees')

    return (
      <Table.Footer data-testid={displayName}>
        <TableRow key='paid'>
          <TableCell>
            <Typography as='span' weight='semibold'>
              {translate('Table.TableFooter.totalPaid')}
            </Typography>
          </TableCell>
          <TableCell data-testid='total-paid-company'>
            <Amount amount={paidCompany || '0'} weight='semibold' />
          </TableCell>
          <TableCell data-testid='total-paid-commissions'>
            <Amount amount={paidCommissions || '0'} weight='semibold' />
          </TableCell>
        </TableRow>
        <TableRow key='debit'>
          <TableCell data-testid='total-debits'>
            <Typography as='span' weight='semibold'>
              {translate('Table.TableFooter.totalDebits')}
            </Typography>
          </TableCell>
          <TableCell data-testid='total-debits-company'>
            <Amount amount={debitCompany || '0'} weight='semibold' />
          </TableCell>
          <TableCell colSpan={2} data-testid='total-debits-commissions'>
            <Amount amount={debitCommissions || '0'} weight='semibold' />
          </TableCell>
        </TableRow>
        <TableRow key='credit'>
          <TableCell data-testid='total-credits'>
            <Typography as='span' weight='semibold'>
              {translate('Table.TableFooter.totalCredits')}
            </Typography>
          </TableCell>
          <TableCell data-testid='total-credits-company'>
            <Amount amount={creditCompany || '0'} weight='semibold' />
          </TableCell>
          <TableCell colSpan={2} data-testid='total-credits-commissions'>
            <Amount amount={creditCommissions || '0'} weight='semibold' />
          </TableCell>
        </TableRow>
      </Table.Footer>
    )
  }
)

TableFooter.displayName = displayName

export default TableFooter
