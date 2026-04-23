import { useTranslation } from 'react-i18next'
import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'

const PurchaseOrderLineDetailsSkeleton = () => {
  const { t: translate } = useTranslation('purchaseOrder')

  return (
    <DetailedList>
      <DetailedList.Row>
        <DetailedList.Item label={translate('page.details.company')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
        <DetailedList.Item label={translate('page.details.invoicedTotal')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
      </DetailedList.Row>

      <DetailedList.Row>
        <DetailedList.Item label={translate('page.details.amount')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
        <DetailedList.Item label={translate('page.details.draftedTotal')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
      </DetailedList.Row>

      <DetailedList.Row>
        <DetailedList.Item label={translate('page.details.poNumber')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
        <DetailedList.Item label={translate('page.details.expirationDate')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
      </DetailedList.Row>

      <DetailedList.Row>
        <DetailedList.Item label={translate('page.details.threshold')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
        <DetailedList.Item label={translate('page.details.mainPO')}>
          <SkeletonLoader.Typography />
        </DetailedList.Item>
      </DetailedList.Row>
    </DetailedList>
  )
}

export default {
  PurchaseOrderLineDetailsSkeleton
}
