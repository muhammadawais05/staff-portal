import billingCycles from '../graphql/billing/billingCycles'
import engagementDocuments from '../graphql/gateway/engagementDocuments'

export const mockBillingCycleWithDocs = {
  ...billingCycles[0],
  childrenCycles: [],
  commissions: [engagementDocuments.commissions[0]],
  invoices: [engagementDocuments.invoices[0]],
  payments: [engagementDocuments.payments[0]]
}
