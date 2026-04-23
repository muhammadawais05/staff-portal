import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import ListTotals from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals/ListTotals'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton/Skeleton'

import { usePaymentListContext } from '../../../payment/context/PaymentListContext'
import { useGetPaymentsGrandTotalsQuery } from '../../../payment/data/getGrandTotalsPaymentsList.graphql.types'
import { receivedPaymentSortOrder } from '../../utils'

const displayName = 'ReceivedPaymentsTotals'

const ReceivedPaymentsTotals = () => {
  const { pagination } = usePaymentListContext()
  const { data, loading, initialLoading } = useGetData(
    useGetPaymentsGrandTotalsQuery,
    'payments'
  )(
    {
      filter: { myPayments: true },
      pagination
    },
    {
      abortKey: displayName
    }
  )

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton.ListTotals />}
    >
      <ListTotals totals={data?.totals} sortOrder={receivedPaymentSortOrder} />
    </ContentLoader>
  )
}

ReceivedPaymentsTotals.displayName = displayName

export default ReceivedPaymentsTotals
