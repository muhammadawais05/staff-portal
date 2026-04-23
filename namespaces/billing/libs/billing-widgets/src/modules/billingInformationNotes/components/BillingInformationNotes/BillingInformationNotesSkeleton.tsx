import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'

const BillingInformationNotesSkeleton = () => {
  const { t: translate } = useTranslation('billingInformationNotes')

  return (
    <Section
      title={translate('title')}
      variant='withHeaderBar'
      actions={<SkeletonLoader.Button size='small' />}
    >
      <SkeletonLoader.Typography />
    </Section>
  )
}

export default BillingInformationNotesSkeleton
