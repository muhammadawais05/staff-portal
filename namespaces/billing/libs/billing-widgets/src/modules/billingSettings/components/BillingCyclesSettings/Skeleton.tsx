import { SkeletonLoader, Typography, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

const BillingCyclesSettingsSkeleton = () => {
  const { t: translate } = useTranslation('billingSettings')

  return (
    <Container flex justifyContent='space-between' left='small' right='small'>
      <Typography size='medium'>
        {translate(
          'billingSettingsEdit.table.changeBillingCycleSettings.label'
        )}
      </Typography>
      <SkeletonLoader.Button size='small' />
    </Container>
  )
}

export default BillingCyclesSettingsSkeleton
