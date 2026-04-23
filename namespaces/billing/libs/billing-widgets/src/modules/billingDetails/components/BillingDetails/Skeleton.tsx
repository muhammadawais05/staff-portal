import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { DetailedListSkeleton, SubSection } from '@staff-portal/ui'

const BillingDetailsSkeleton = () => {
  const { t: translate } = useTranslation('billingDetails')

  return (
    <Section
      title={translate('title')}
      actions={<SkeletonLoader.Button size='small' />}
      variant='withHeaderBar'
    >
      <SubSection>
        <DetailedListSkeleton
          columns={1}
          striped
          labelColumnWidth={12}
          items={10}
        />
      </SubSection>
      <SubSection
        title={<SkeletonLoader.Header />}
        actions={<SkeletonLoader.Button size='small' />}
      />
      <SubSection
        title={<SkeletonLoader.Header />}
        actions={<SkeletonLoader.Button size='small' />}
      />
    </Section>
  )
}

export default BillingDetailsSkeleton
