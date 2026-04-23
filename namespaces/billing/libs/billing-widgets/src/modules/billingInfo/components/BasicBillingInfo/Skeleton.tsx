import { Section, SkeletonLoader } from '@toptal/picasso'
import { DetailedListSkeleton } from '@staff-portal/ui'
import { useTranslation } from 'react-i18next'
import React from 'react'

const BasicBillingInfoContentSkeleton = () => {
  const { t: translate } = useTranslation('billingBasicInfo')

  return (
    <Section
      title={translate('title')}
      variant='withHeaderBar'
      actions={<SkeletonLoader.Button size='small' />}
    >
      <DetailedListSkeleton
        columns={2}
        striped
        labelColumnWidth={12}
        items={4}
      />
    </Section>
  )
}

export default BasicBillingInfoContentSkeleton
