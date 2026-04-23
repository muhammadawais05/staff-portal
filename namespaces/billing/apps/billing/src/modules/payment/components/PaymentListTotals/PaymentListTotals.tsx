import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ListTotals from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton'
import {
  paymentTotalSortOrder,
  paymentListUpdateDataEvents
} from '@staff-portal/billing-widgets/src/modules/payment/utils'

import { useGetPaymentsGrandTotalsQuery } from '../../data/getGrandTotalsPaymentsList.graphql.types'
import { usePaymentListContext } from '../../context/PaymentListContext'

const displayName = 'PaymentListTotals'

const PaymentListTotals = () => {
  const { filter, pagination } = usePaymentListContext()
  const { data, loading, initialLoading, refetch } = useGetData(
    useGetPaymentsGrandTotalsQuery,
    'payments'
  )(
    {
      filter,
      pagination
    },
    {
      abortKey: displayName
    }
  )

  useRefetch(paymentListUpdateDataEvents, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton.ListTotals />}
    >
      <ListTotals totals={data?.totals} sortOrder={paymentTotalSortOrder} />
    </ContentLoader>
  )
}

PaymentListTotals.displayName = displayName

export default PaymentListTotals
