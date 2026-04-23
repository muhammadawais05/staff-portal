import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useGetPurchaseOrderLineDetails } from '../../data'
import PurchaseOrderLineDetailsTableContent from '../PurchaseOrderLineDetailsTableContent'
import Skeleton from './skeleton'

interface PurchaseOrderLineDetailsTableProps {
  purchaseOrderLineId: string
}

export const PurchaseOrderLineDetailsTable = ({
  purchaseOrderLineId
}: PurchaseOrderLineDetailsTableProps) => {
  const { data, initialLoading, loading, refetch } =
    useGetPurchaseOrderLineDetails(purchaseOrderLineId)

  useRefetch(
    [
      ApolloContextEvents.purchaseOrderLineArchiveToggle,
      ApolloContextEvents.purchaseOrderUpdate
    ],
    refetch
  )

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton.PurchaseOrderLineDetailsSkeleton />}
    >
      <PurchaseOrderLineDetailsTableContent purchaseOrderLine={data} />
    </ContentLoader>
  )
}

export default PurchaseOrderLineDetailsTable
