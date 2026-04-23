import React from 'react'
import { Section, SkeletonLoader, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'

import BillingCyclesSkeleton from '../../../billingCycles/components/Skeleton'

const BillingEngagementDetailsSkeleton = () => {
  const { t: translate } = useTranslation([
    'billingSettings',
    'extraExpenses',
    'placementFees'
  ])

  return (
    <>
      <Container top='medium'>
        <Section
          title={translate('billingSettings:information.title')}
          variant='withHeaderBar'
        >
          <SkeletonLoader.Typography />
          <TableSkeleton
            title={translate('billingSettings:billingSettingsEdit.title')}
            row={1}
            column={1}
          />
        </Section>
      </Container>
      <Container top='medium'>
        <BillingCyclesSkeleton
          variant='withHeaderBar'
          actions={<InlineActionsSkeleton numberOfButtons={1} size='small' />}
        />
      </Container>
      <Container top='medium'>
        <Section
          variant='withHeaderBar'
          title={translate('extraExpenses:Table.title')}
        >
          <TableSkeleton row={3} column={9} />
        </Section>
      </Container>
      <Container top='medium'>
        <Section
          variant='withHeaderBar'
          title={translate('placementFees:Table.title')}
        >
          <TableSkeleton row={3} column={9} />
        </Section>
      </Container>
    </>
  )
}

export default BillingEngagementDetailsSkeleton
