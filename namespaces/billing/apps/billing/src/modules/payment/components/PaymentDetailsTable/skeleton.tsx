import React from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Container, SkeletonLoader } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'

const PaymentDetailsSkeleton = () => {
  const { t: translate } = useTranslation('payment')

  return (
    <Section title={translate('page.details.subtitle')}>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        columns={2}
        striped
        labelColumnWidth={8}
        items={[
          {
            label: translate('page.details.paymentFor') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.company') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.engagement') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.status') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.type') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.amount') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.balanceDue') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.paymentMethod') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.paymentGroup') as string,
            value: <SkeletonLoader.Typography />
          },
          {
            label: translate('page.details.createdOn') as string,
            value: <SkeletonLoader.Typography />
          }
        ]}
      />
      <Container bottom='medium' top='xsmall'>
        <SkeletonLoader.Typography rows={2} />
      </Container>
    </Section>
  )
}

export default {
  PaymentDetailsSkeleton
}
