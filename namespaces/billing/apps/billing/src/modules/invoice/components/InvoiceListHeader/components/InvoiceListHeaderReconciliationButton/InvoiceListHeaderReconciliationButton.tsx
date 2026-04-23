import { Button, SkeletonLoader } from '@toptal/picasso'
import React from 'react'
import { useTranslation } from 'react-i18next'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useHistory, useLocation } from '@staff-portal/navigation'

import { useInvoiceListContext } from '../../../../contexts/invoiceListContext'
import { useGetInvoiceListReconciliationOperationQuery } from '../../data'

const InvoiceListHeaderReconciliationButton = () => {
  const { t: translate } = useTranslation('invoiceList')
  const { filter, pagination } = useInvoiceListContext()
  const { search } = useLocation()
  const { push } = useHistory()

  const {
    data: { operations: { reconcileInvoices } } = { operations: {} },
    loading,
    initialLoading,
    refetch
  } = useGetData(
    useGetInvoiceListReconciliationOperationQuery,
    'invoicesNullable'
  )(
    {
      filter,
      pagination
    },
    { abortKey: 'invoices-reconciliation' }
  )

  useRefetch(ApolloContextEvents.invoiceConsolidatedCreate, refetch)

  const handleClick = () => {
    push(`/invoices/reconciliation/${search}`)
  }

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<SkeletonLoader.Typography />}
    >
      <OperationWrapper operation={reconcileInvoices}>
        <Button
          data-testid='reconciliation-button'
          onClick={handleClick}
          size='small'
        >
          {translate('header.actions.reconciliation')}
        </Button>
      </OperationWrapper>
    </ContentLoader>
  )
}

export default InvoiceListHeaderReconciliationButton
