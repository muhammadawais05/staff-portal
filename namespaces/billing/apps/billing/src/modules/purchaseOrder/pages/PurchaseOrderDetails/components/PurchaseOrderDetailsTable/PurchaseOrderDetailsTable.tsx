import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useGetPurchaseOrderDetails } from '../../data'
import PurchaseOrderDetailsTableContent from '../PurchaseOrderDetailsTableContent'
import Skeleton from './skeleton'

const displayName = 'PurchaseOrderDetailsTable'

interface PurchaseOrderDetailsTableProps {
  purchaseOrderId: string
  poLinesEnabled: boolean
}

export const PurchaseOrderDetailsTable = ({
  purchaseOrderId,
  poLinesEnabled = false
}: PurchaseOrderDetailsTableProps) => {
  const { data, initialLoading, loading, refetch } =
    useGetPurchaseOrderDetails(purchaseOrderId)

  useRefetch(
    [
      ApolloContextEvents.purchaseOrderArchiveToggle,
      ApolloContextEvents.purchaseOrderUpdate
    ],
    refetch
  )

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        poLinesEnabled ? (
          <Skeleton.PurchaseOrderLinesSkeleton />
        ) : (
          <Skeleton.PurchaseOrderDetailsSkeleton />
        )
      }
    >
      <PurchaseOrderDetailsTableContent
        purchaseOrder={data}
        poLinesEnabled={poLinesEnabled}
      />
    </ContentLoader>
  )
}

PurchaseOrderDetailsTable.displayName = displayName

export default PurchaseOrderDetailsTable
