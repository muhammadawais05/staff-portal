import React, { FC, memo } from 'react'
import { Amount, Table, Typography, Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { InvoiceConnection } from '@staff-portal/graphql/staff'
import {
  formatDateMed,
  formatDistanceInWordsToNow
} from '@staff-portal/billing/src/_lib/dateTime'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import * as S from './styles'
import EntOverviewEmpty from '../EntOverviewEmpty'
import EntOverviewExternalLink from '../EntOverviewExternalLink'

const displayName = 'EntOverviewBillingInvoicesTable'

export interface Props {
  invoices: InvoiceConnection | null
  variant: InvoicesTableVariant
}

export enum InvoicesTableVariant {
  disputed = 'disputed',
  overdue = 'overdue'
}

const TableCell = Table.Cell

export const EntOverviewBillingInvoicesTable: FC<Props> = memo(
  ({ invoices, variant }) => {
    const { t: translate } = useTranslation('entOverview')

    return (
      <Section
        data-testid={displayName}
        title={translate(`billing.invoices.title.${variant}` as const)}
        titleSize='small'
      >
        {invoices?.nodes?.length ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <TableCell css={S.cell}>
                  {translate('billing.invoices.table.company')}
                </TableCell>
                <TableCell css={S.cell}>
                  {variant === InvoicesTableVariant.disputed
                    ? translate('billing.invoices.table.dueDate')
                    : translate('billing.invoices.table.pastDue')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.invoices.table.issueDate')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.invoices.table.jobName')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.invoices.table.contact')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.invoices.table.netTerms')}
                </TableCell>
                <TableCell css={S.cell} align='right'>
                  {translate('billing.invoices.table.amount')}
                </TableCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {invoices.nodes.map(
                ({
                  id,
                  subject: {
                    contact,
                    netTerms,
                    webResource: clientWebResource
                  },
                  dueDate,
                  issueDate,
                  job,
                  amount
                }) => (
                  <Table.Row data-testid={`${displayName}-row`} key={id}>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <EntOverviewExternalLink
                        webResource={clientWebResource}
                      />
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      {variant === InvoicesTableVariant.disputed ? (
                        dueDate ? (
                          formatDateMed(dueDate)
                        ) : (
                          EMPTY_DATA
                        )
                      ) : (
                        <Typography color='red'>
                          {dueDate
                            ? formatDistanceInWordsToNow(dueDate, true)
                            : EMPTY_DATA}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      {issueDate ? formatDateMed(issueDate) : EMPTY_DATA}
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      {job && (
                        <EntOverviewExternalLink
                          webResource={job.webResource}
                        />
                      )}
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <EntOverviewExternalLink
                        webResource={contact?.webResource}
                      />
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      Net {netTerms}
                    </TableCell>
                    <TableCell
                      css={S.cell}
                      data-testid={`${displayName}-cell`}
                      align='right'
                    >
                      <Amount amount={amount} />
                    </TableCell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        ) : (
          <EntOverviewEmpty />
        )}
      </Section>
    )
  }
)

EntOverviewBillingInvoicesTable.defaultProps = {}

EntOverviewBillingInvoicesTable.displayName = displayName

export default EntOverviewBillingInvoicesTable
