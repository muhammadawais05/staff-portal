import React from 'react'
import { useTranslation } from 'react-i18next'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'

import { useInvoiceListContext } from '../../../../contexts/invoiceListContext'
import { useGetInvoicesListHeaderQuery } from '../../data/getInvoiceListHeader.graphql.types'
import InvoiceListHeaderConsolidatedButton from '../InvoiceListHeaderConsolidatedButton'
import InvoiceListHeaderDownloadButton from '../InvoiceListHeaderDownloadButton'
import InvoiceListHeaderReconciliationButton from '../InvoiceListHeaderReconciliationButton'

const displayName = 'InvoiceListHeader'
const MAX_RECORDS = 2000

const InvoiceListHeader = () => {
  const { filter } = useInvoiceListContext()
  const { t: translate } = useTranslation('invoiceList')

  const { data, loading, initialLoading, refetch } = useGetData(
    useGetInvoicesListHeaderQuery,
    'invoices'
  )(
    {
      filter,
      pagination: {
        limit: 0,
        offset: 0
      }
    },
    { abortKey: displayName }
  )

  useRefetch(ApolloContextEvents.invoiceConsolidatedCreate, refetch)

  const { downloadXlsxUrl, totalCount = 0 } = data || {}

  const tooManyRecords = totalCount && totalCount >= MAX_RECORDS
  const messages = tooManyRecords
    ? [
        translate('header.actions.downloadInvoicesTooManyRecords', {
          max: MAX_RECORDS
        })
      ]
    : []
  const callable =
    !totalCount || tooManyRecords || !downloadXlsxUrl
      ? OperationCallableTypes.DISABLED
      : OperationCallableTypes.ENABLED
  const downloadButtonFakeOperation = {
    callable,
    messages
  }

  return (
    <ContentLoader
      as='span'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<InlineActionsSkeleton numberOfButtons={2} />}
    >
      <InlineActionsWrapper marginSizeBetweenChildren='xsmall'>
        <InvoiceListHeaderReconciliationButton />
        <InvoiceListHeaderDownloadButton
          url={downloadXlsxUrl}
          operation={downloadButtonFakeOperation}
        />
        <InvoiceListHeaderConsolidatedButton />
      </InlineActionsWrapper>
    </ContentLoader>
  )
}

InvoiceListHeader.displayName = displayName

export default InvoiceListHeader
