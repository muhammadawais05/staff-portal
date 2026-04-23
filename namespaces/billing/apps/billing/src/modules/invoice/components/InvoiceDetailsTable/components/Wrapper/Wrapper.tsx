import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { invoiceDetailsUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/invoice/utils'
import { useGetExperiments } from '@staff-portal/billing/src/data'

import Skeleton from './skeleton'
import InvoiceDetailsTable from '../Table'
import { useGetInvoiceDetailsTable } from '../../data/useGetInvoiceDetailsTable'

const displayName = 'InvoiceDetailsTable'

interface Props {
  invoiceId: string
}

export const InvoiceDetailsTableWrapper = ({ invoiceId }: Props) => {
  const {
    data,
    loading: invoiceLoading,
    initialLoading: invoiceInitialLoading,
    refetch
  } = useGetInvoiceDetailsTable(invoiceId)

  // TODO: remove once poLinesExperiment has been released to production - https://toptal-core.atlassian.net/browse/BILL-2144
  const {
    data: experiments,
    loading: experimentsLoading,
    initialLoading: experimentsInitialLoading
  } = useGetExperiments()

  const poLinesEnabled = Boolean(experiments?.poLines?.enabled)

  const loading = experimentsLoading || invoiceLoading
  const initialLoading = experimentsInitialLoading || invoiceInitialLoading

  useRefetch(invoiceDetailsUpdateDataEvents, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton.InvoiceDetailsTableSkeleton />}
    >
      <InvoiceDetailsTable invoice={data} poLinesEnabled={poLinesEnabled} />
    </ContentLoader>
  )
}

InvoiceDetailsTableWrapper.displayName = displayName

export default InvoiceDetailsTableWrapper
