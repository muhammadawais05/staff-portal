import { Table, Typography, Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { TimesheetsConnection } from '@staff-portal/graphql/staff'
import { formatDistanceInWordsToNow } from '@staff-portal/billing/src/_lib/dateTime'

import * as S from './styles'
import EntOverviewEmpty from '../EntOverviewEmpty'
import EntOverviewExternalLink from '../EntOverviewExternalLink'

const displayName = 'EntOverviewBillingTimesheetsTable'

export interface Props {
  timesheets?: TimesheetsConnection | null
}

const TableCell = Table.Cell

export const EntOverviewBillingTimesheetsTable: FC<Props> = memo(
  ({ timesheets }) => {
    const { t: translate } = useTranslation('entOverview')

    return (
      <Section
        data-testid={displayName}
        title={translate('billing.timesheetsOverdue.title')}
        titleSize='small'
      >
        {timesheets?.nodes?.length ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <TableCell css={S.cell}>
                  {translate('billing.timesheetsOverdue.table.company')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.timesheetsOverdue.table.pastDue')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.timesheetsOverdue.table.jobName')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.timesheetsOverdue.table.talent')}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.timesheetsOverdue.table.recruiter')}
                </TableCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {timesheets.nodes.map(
                ({
                  id,
                  dueDate,
                  client: { webResource: clientWebResource },
                  job: { webResource: jobWebResource },
                  talent: { webResource: talentWebResource },
                  recruiter: { webResource: recruiterWebResource }
                }) => (
                  <Table.Row key={id} data-testid={`${displayName}-row`}>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <EntOverviewExternalLink
                        webResource={clientWebResource}
                      />
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <Typography color='red'>
                        {formatDistanceInWordsToNow(dueDate, true)}
                      </Typography>
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <EntOverviewExternalLink webResource={jobWebResource} />
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <EntOverviewExternalLink
                        webResource={talentWebResource}
                      />
                    </TableCell>
                    <TableCell css={S.cell} data-testid={`${displayName}-cell`}>
                      <EntOverviewExternalLink
                        webResource={recruiterWebResource}
                      />
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

EntOverviewBillingTimesheetsTable.displayName = displayName

export default EntOverviewBillingTimesheetsTable
