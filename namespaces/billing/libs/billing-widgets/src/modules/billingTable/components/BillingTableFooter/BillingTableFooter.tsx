import { Amount, Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { formatAsNumber } from '@staff-portal/billing/src/_lib/helpers'

import * as S from './styles'
import { BillingDocumentsTotals } from '../../utils'

export interface BillingTableFooterProps {
  hasHours: boolean
  hasTalentTotals: boolean
  isCondensed: boolean
  colSpan?: number
  totals: BillingDocumentsTotals
}

const displayName = 'BillingTableFooter'

const TableRow = Table.Row
const TableCell = Table.Cell
const TableFooter = Table.Footer

export const BillingTableFooter: FC<BillingTableFooterProps> = memo(
  ({
    hasHours,
    hasTalentTotals,
    isCondensed,
    colSpan = 6,
    totals: {
      totalHours = 0,
      totalPaidCompany = 0,
      totalPaidTalent = 0,
      totalPaidCommissions = 0,
      totalDebitsCompany = 0,
      totalDebitsTalent = 0,
      totalDebitsCommissions = 0,
      totalCreditsCompany = 0,
      totalCreditsTalent = 0,
      totalCreditsCommissions = 0
    } = {}
  }) => {
    const { t: translate } = useTranslation('billingTable')

    return (
      <TableFooter data-testid={displayName}>
        <TableRow key='paid'>
          <TableCell css={S.tableFooterCell(isCondensed)} colSpan={colSpan - 1}>
            {translate('TableFooter.totalPaid')}
          </TableCell>
          {hasHours && (
            <TableCell
              css={S.tableFooterCell(isCondensed)}
              data-testid='total-paid'
            >
              {formatAsNumber(totalHours, { precisionMin: 0 })}
            </TableCell>
          )}
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            data-testid='total-paid-company'
          >
            <Amount amount={totalPaidCompany} />
          </TableCell>
          {hasTalentTotals && (
            <TableCell
              css={S.tableFooterCell(isCondensed)}
              data-testid='total-paid-talent'
            >
              <Amount amount={totalPaidTalent} />
            </TableCell>
          )}
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            data-testid='total-paid-commissions'
          >
            <Amount amount={totalPaidCommissions} />
          </TableCell>
        </TableRow>
        <TableRow key='debit'>
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            colSpan={colSpan}
            data-testid='total-debits'
          >
            {translate('TableFooter.totalDebits')}
          </TableCell>
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            data-testid='total-debits-company'
          >
            <Amount amount={totalDebitsCompany} />
          </TableCell>
          {hasTalentTotals && (
            <TableCell
              css={S.tableFooterCell(isCondensed)}
              data-testid='total-debits-talent'
            >
              <Amount amount={totalDebitsTalent} />
            </TableCell>
          )}
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            colSpan={hasTalentTotals ? 1 : 2}
            data-testid='total-debits-commissions'
          >
            <Amount amount={totalDebitsCommissions} />
          </TableCell>
        </TableRow>
        <TableRow key='credit'>
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            colSpan={colSpan}
            data-testid='total-credits'
          >
            {translate('TableFooter.totalCredits')}
          </TableCell>
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            data-testid='total-credits-company'
          >
            <Amount amount={totalCreditsCompany} />
          </TableCell>
          {hasTalentTotals && (
            <TableCell
              css={S.tableFooterCell(isCondensed)}
              data-testid='total-credits-talent'
            >
              <Amount amount={totalCreditsTalent} />
            </TableCell>
          )}
          <TableCell
            css={S.tableFooterCell(isCondensed)}
            colSpan={hasTalentTotals ? 1 : 2}
            data-testid='total-credits-commissions'
          >
            <Amount amount={totalCreditsCommissions} />
          </TableCell>
        </TableRow>
      </TableFooter>
    )
  }
)

BillingTableFooter.displayName = displayName

export default BillingTableFooter
