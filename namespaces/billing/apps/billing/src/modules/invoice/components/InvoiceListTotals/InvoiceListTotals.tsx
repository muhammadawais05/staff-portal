import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { invoiceListUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/invoice/utils'
import ListTotals from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton'

import { invoiceTotalSortOrder } from '../../utils'
import { useGetInvoicesGrandTotalsQuery } from '../../data/getGrandTotalsInvoiceList.graphql.types'
import { useInvoiceListContext } from '../../contexts/invoiceListContext'

const displayName = 'InvoiceListTotals'

const InvoiceListTotals = () => {
  const { filter, pagination } = useInvoiceListContext()
  const { data, loading, initialLoading, refetch } = useGetData(
    useGetInvoicesGrandTotalsQuery,
    'invoices'
  )(
    {
      filter,
      pagination
    },
    {
      abortKey: displayName
    }
  )

  useRefetch(invoiceListUpdateDataEvents, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton.ListTotals />}
    >
      <ListTotals totals={data?.totals} sortOrder={invoiceTotalSortOrder} />
    </ContentLoader>
  )
}

InvoiceListTotals.displayName = displayName

export default InvoiceListTotals
