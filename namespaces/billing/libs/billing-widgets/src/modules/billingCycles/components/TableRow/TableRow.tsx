import { Table, TimeConvert16, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { BillingCycleStatus } from '@staff-portal/graphql/staff'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { formatAsNumber } from '@staff-portal/billing/src/_lib/helpers'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'

import * as S from './styles'
import { BillingCycleWithDocs } from '../BillingCycleTable/BillingCycleTable'
import BillingCommissions from '../../../billingTable/components/BillingCommissions'
import TableRowChildren from '../TableRowChildren'
import CommitmentCell from '../CommitmentCell'
import BillingTableDocuments from '../../../billingTable/components/BillingTableDocuments'
import TableRowConsolidatedInvoice from '../TableRowConsolidatedInvoice'
import { getConsolidatedInvoice } from './utils/getConsolidatedInvoice'

interface Props {
  billingCycle: BillingCycleWithDocs
  isChild: boolean
  isAltColor: boolean
}

const displayName = 'TableRow'

const TableCell = Table.Cell

export const TableRow = ({ billingCycle, isChild, isAltColor }: Props) => {
  const {
    actualCommitment,
    childrenCycles,
    commissions,
    endDate,
    hasChildAdjustments,
    chargedHours,
    invoices,
    kind,
    originalCommitment,
    payments,
    startDate,
    status
  } = billingCycle
  const { t: translate } = useTranslation(['billingCycleTable', 'billingTable'])
  const [isExpanded, setExpanded] = useState(false)

  const notIssuedYet =
    !invoices?.length && !payments?.length && !commissions?.length
  const displayHours = formatAsNumber(chargedHours, { precisionMin: 0 })
  const isRemoved = status === BillingCycleStatus.removed
  const hasChildrenRows = !!childrenCycles?.length
  const showChildren = hasChildrenRows && isExpanded
  const isTall = commissions.length > 1
  const isExtraHours =
    (actualCommitment.availability as string) === 'extra_hours'

  const consolidatedInvoice = getConsolidatedInvoice({
    billingCycle,
    isChild
  })

  return (
    <>
      <Table.Row
        css={S.tablePlainRow({ isAltColor, isExpanded })}
        data-is-removed={isRemoved}
        data-testid='BillingCycleTableRow'
      >
        <TableCell
          css={S.cellIcon({ isTall, isExtraHours })}
          data-testid='consolidated'
        >
          {hasChildrenRows && (
            <RowExpander
              isExpanded={isExpanded}
              handleOnClick={() => {
                setExpanded(!isExpanded)
              }}
              testId='consolidated-expand'
            />
          )}
          {consolidatedInvoice && (
            <TableRowConsolidatedInvoice invoice={consolidatedInvoice} />
          )}
          {isExtraHours && <TimeConvert16 data-testid='extra-hours-icon' />}
        </TableCell>
        <TableCell css={S.cellStartDate({ isTall })} data-testid='start-date'>
          <Typography css={S.typography(isRemoved)}>
            {formatDateMed(startDate)}
          </Typography>
        </TableCell>
        <TableCell css={S.cellEndDate({ isTall })} data-testid='end-date'>
          <Typography css={S.typography(isRemoved)}>
            {formatDateMed(endDate)}
          </Typography>
        </TableCell>
        <TableCell css={S.cellType({ isTall })} data-testid='kind'>
          <Typography css={S.typography(isRemoved)}>
            {translate(`billingCycleTable:BillingCycleKind.${kind}` as const)}
          </Typography>
        </TableCell>
        <TableCell css={S.cellCommitment({ isTall })} data-testid='commitment'>
          <CommitmentCell
            actualCommitment={actualCommitment}
            isRemoved={isRemoved}
            originalCommitment={originalCommitment}
          />
        </TableCell>
        <TableCell css={S.cellHours({ isTall })} data-testid='hours'>
          <Typography css={S.typography(isRemoved)}>{displayHours}</Typography>
        </TableCell>
        <TableCell css={S.cellCompany({ isTall })} data-testid='invoices'>
          {notIssuedYet ? (
            <Typography>{translate('billingTable:NotIssuedYet')}</Typography>
          ) : (
            <BillingTableDocuments
              data={{ nodes: invoices }}
              testid='BillingCycleTableRow-invoices'
              hasChildAdjustments={hasChildAdjustments}
            />
          )}
        </TableCell>
        <TableCell css={S.cellTalent({ isTall })} data-testid='payments'>
          <BillingTableDocuments
            data={{ nodes: payments }}
            testid='BillingCycleTableRow-payments'
          />
        </TableCell>
        <TableCell
          css={S.cellCommissions({ isTall })}
          data-testid='commissions'
        >
          <BillingCommissions
            commissions={commissions}
            testid='BillingCycleTableRow-commissions'
          />
        </TableCell>
      </Table.Row>
      {showChildren && (
        <TableRowChildren
          childrenCycles={childrenCycles}
          isAltColor={isAltColor}
        />
      )}
    </>
  )
}

TableRow.displayName = displayName

export default TableRow
