import { Container } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { BillingOverview } from '@staff-portal/billing/src/@types/types'

import { InvoicesTableVariant } from './components/EntOverviewBillingInvoicesTable/EntOverviewBillingInvoicesTable'
import { PurchaseOrdersTableVariant } from './components/EntOverviewBillingPurchaseOrdersTable/EntOverviewBillingPurchaseOrdersTable'
import EntOverviewBillingHeader from './components/EntOverviewBillingHeader'
import EntOverviewBillingInvoicesTable from './components/EntOverviewBillingInvoicesTable'
import EntOverviewBillingPurchaseOrdersTable from './components/EntOverviewBillingPurchaseOrdersTable'
import EntOverviewBillingSummary from './components/EntOverviewBillingSummary'
import EntOverviewBillingTimesheetsTable from './components/EntOverviewBillingTimesheetsTable'
const displayName = 'EntOverviewBilling'

export interface Props {
  data: BillingOverview
}

export const EntOverviewBilling: FC<Props> = memo(({ data }) => {
  const {
    invoicesOverview,
    invoicesDisputed,
    invoicesOverdue,
    purchaseOrdersExpiration,
    purchaseOrdersLimit,
    timesheets
  } = data

  return (
    <Container data-testid={displayName}>
      <EntOverviewBillingHeader />
      <EntOverviewBillingSummary summary={invoicesOverview} />
      <EntOverviewBillingInvoicesTable
        invoices={invoicesDisputed}
        variant={InvoicesTableVariant.disputed}
      />
      <EntOverviewBillingInvoicesTable
        invoices={invoicesOverdue}
        variant={InvoicesTableVariant.overdue}
      />
      <EntOverviewBillingPurchaseOrdersTable
        purchaseOrders={purchaseOrdersExpiration}
        variant={PurchaseOrdersTableVariant.closestToExpiration}
      />
      <EntOverviewBillingPurchaseOrdersTable
        purchaseOrders={purchaseOrdersLimit}
        variant={PurchaseOrdersTableVariant.closestToLimit}
      />
      <EntOverviewBillingTimesheetsTable timesheets={timesheets} />
    </Container>
  )
})

EntOverviewBilling.defaultProps = {}

EntOverviewBilling.displayName = displayName

export default EntOverviewBilling
