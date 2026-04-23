import { useTranslation } from 'react-i18next'
import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'

const PurchaseOrderLinesSkeleton = () => {
  const { t: translate } = useTranslation('purchaseOrder')

  return (
    <Section title={translate('page.details.subtitle')}>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        columns={2}
        striped
        labelColumnWidth={8}
        items={[
          {
            label: translate('page.details.company') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.poNumber') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.amount') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.threshold') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.invoicedTotal') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.expirationDate') as string,
            value: <SkeletonLoader.Typography />
          }
        ]}
      />
    </Section>
  )
}

const PurchaseOrderDetailsSkeleton = () => {
  const { t: translate } = useTranslation('purchaseOrder')

  return (
    <Section title={translate('page.details.subtitle')}>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        columns={2}
        striped
        labelColumnWidth={8}
        items={[
          {
            label: translate('page.details.company') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.draftedTotal') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.poNumber') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.invoicedTotal') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.totalAmount') as string,
            value: <SkeletonLoader.Typography />
          }
        ]}
      />
    </Section>
  )
}

export default {
  PurchaseOrderDetailsSkeleton,
  PurchaseOrderLinesSkeleton
}
