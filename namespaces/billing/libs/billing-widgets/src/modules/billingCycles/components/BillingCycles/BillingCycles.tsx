import React, { FC, ReactElement, memo } from 'react'
import { EmptyState, Section, SectionProps, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import {
  decodeId,
  getOldGID
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'

import { useGetBillingCyclesQuery } from '../../data'
import BillingCycleTable from '../BillingCycleTable'
import { GetBillingCyclesQuery } from '../../data/getBillingCycles.graphql.types'
import * as S from './styles'

interface Props {
  actions?: ReactElement
  engagementId: string
  listenedBillingCycleMessages?: TypedMessage[]
  variant?: SectionProps['variant']
}

const hasEmptyData = (data?: GetBillingCyclesQuery) =>
  !data?.node?.billingCycles?.nodes?.length

const BillingCycles: FC<Props> = memo(
  ({
    actions,
    engagementId,
    listenedBillingCycleMessages,
    variant = 'default'
  }) => {
    const id = decodeId({ id: engagementId, type: 'engagement' })
    const { t: translate } = useTranslation('billingCycleTable')
    const engagementGid = getOldGID({ id, type: 'engagement' })

    const { data, loading, refetch, initialLoading } = useGetBillingCyclesQuery(
      {
        variables: {
          id: engagementId,
          engagementGid
        }
      }
    )

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <Section title={translate('title')} variant={variant}>
            <TableSkeleton actions={actions} row={10} column={9} />
          </Section>
        }
      >
        <Section
          actions={actions}
          variant={variant}
          data-testid='billing-cycles'
          title={translate('title')}
          css={S.wrapper}
        >
          <Container bottom={2}>
            {hasEmptyData(data) ? (
              <EmptyState.Collection data-testid='BillingCycleTableEmpty'>
                {translate('emptyTable')}
              </EmptyState.Collection>
            ) : (
              <BillingCycleTable
                data={data}
                refetch={refetch}
                listenedBillingCycleMessages={listenedBillingCycleMessages}
              />
            )}
          </Container>
        </Section>
      </ContentLoader>
    )
  }
)

export default BillingCycles
