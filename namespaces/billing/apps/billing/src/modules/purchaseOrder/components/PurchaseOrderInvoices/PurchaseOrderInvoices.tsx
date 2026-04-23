import React, { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState, Section } from '@toptal/picasso'
import { Pagination, toGqlPagination } from '@staff-portal/filters'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'

import InvoiceList from '../../../invoice/components/InvoiceList'
import { useGetPurchaseOrderInvoices } from '../../data'

const displayName = 'PurchaseOrderInvoices'
const PAGE_ITEMS = 15
const MAX_LIST_ITEMS = 10000
const START_PAGE = 1
const DEFAULT_COUNT = 0

interface Props {
  nodeId: string
}

const PurchaseOrderInvoices: FC<Props> = memo(({ nodeId }) => {
  const { t: translate } = useTranslation(['purchaseOrder', 'invoiceList'])
  const [activePage, changePage] = useState(START_PAGE)
  const pagination = toGqlPagination(PAGE_ITEMS, activePage)
  const {
    data: { invoices: { nodes: invoices = [], totalCount = DEFAULT_COUNT } } = {
      invoices: { nodes: [], totalCount: DEFAULT_COUNT },
      totalCount: undefined
    },
    loading,
    initialLoading
  } = useGetPurchaseOrderInvoices(nodeId, pagination)

  const totalItems = Math.min(totalCount, MAX_LIST_ITEMS)

  return (
    <Section
      title={translate('invoiceList:header.title')}
      data-testid={displayName}
    >
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <TableSkeleton column={4} data-testid='InvoiceListSkeleton' />
        }
      >
        {invoices.length > 0 && (
          <>
            <InvoiceList invoices={invoices} statusColumnEnabled />
            <Pagination
              activePage={activePage}
              onPageChange={changePage}
              limit={PAGE_ITEMS}
              itemCount={totalItems}
            />
          </>
        )}

        {!loading && !invoices.length && (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('purchaseOrder:invoices.empty')}
          </EmptyState.Collection>
        )}
      </ContentLoader>
    </Section>
  )
})

PurchaseOrderInvoices.displayName = displayName

export default PurchaseOrderInvoices
