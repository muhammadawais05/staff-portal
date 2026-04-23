import React, { FC, memo } from 'react'
import { OverviewBlock, Container, Grid, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { DocumentStatus, InvoicesTotals } from '@staff-portal/graphql/staff'

import * as S from './styles'
import EntOverviewBillingSummaryPeriod from '../EntOverviewBillingSummaryPeriod'
import EntOverviewBillingSummaryItem from '../EntOverviewBillingSummaryItem/EntOverviewBillingSummaryItem'

const displayName = 'EntOverviewBillingSummary'

export interface Props {
  summary?: InvoicesTotals | null
}

const GridItem = Grid.Item

export const EntOverviewBillingSummary: FC<Props> = memo(({ summary }) => {
  const { t: translate } = useTranslation('entOverview')

  if (
    !summary ||
    !(
      +summary.disputed > 0 ||
      +summary.overdue > 0 ||
      +summary.outstanding > 0 ||
      +summary.paid > 0
    )
  ) {
    return null
  }

  return (
    <Container data-testid={displayName}>
      <Container alignItems='center' flex css={S.headerWrapper}>
        <GridItem css={S.headerTitle}>
          <Typography size='small' variant='heading'>
            {translate('billing.summary.title')}
          </Typography>
        </GridItem>
        <GridItem css={S.headerPeriod}>
          <EntOverviewBillingSummaryPeriod />
        </GridItem>
      </Container>

      <OverviewBlock.Group>
        <EntOverviewBillingSummaryItem
          item={{
            amount: Number(summary.disputed),
            status: DocumentStatus.DISPUTED
          }}
        />

        <EntOverviewBillingSummaryItem
          item={{
            amount: Number(summary.overdue),
            status: DocumentStatus.OVERDUE
          }}
        />

        <EntOverviewBillingSummaryItem
          item={{
            amount: Number(summary.outstanding),
            status: DocumentStatus.OUTSTANDING
          }}
        />

        <EntOverviewBillingSummaryItem
          item={{
            amount: Number(summary.paid),
            status: DocumentStatus.PAID
          }}
        />
      </OverviewBlock.Group>
    </Container>
  )
})

EntOverviewBillingSummary.defaultProps = {}

EntOverviewBillingSummary.displayName = displayName

export default EntOverviewBillingSummary
