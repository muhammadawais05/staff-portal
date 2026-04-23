import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { paymentTotalSortOrder } from '@staff-portal/billing-widgets/src/modules/payment/utils'
import ListTotals from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton'
import { paymentGroupListUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/paymentGroup/utils'

import { useGetPaymentGroupDetailsTotalsQuery } from '../../data'

const displayName = 'PaymentGroupTotals'

interface Props {
  paymentGroupId: string
}

const PaymentGroupTotals = ({ paymentGroupId }: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    useGetPaymentGroupDetailsTotalsQuery
  )(
    {
      nodeId: paymentGroupId,
      pagination: {
        offset: 0,
        limit: 0
      }
    },
    {
      abortKey: displayName
    }
  )

  useRefetch(paymentGroupListUpdateDataEvents, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton.ListTotals />}
    >
      <ListTotals
        totals={data?.payments.totals}
        sortOrder={paymentTotalSortOrder}
      />
    </ContentLoader>
  )
}

PaymentGroupTotals.displayName = displayName

export default PaymentGroupTotals
