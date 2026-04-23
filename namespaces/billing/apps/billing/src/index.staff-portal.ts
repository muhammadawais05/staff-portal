// Naming guideline docs/exportable_naming_guideline.md

export { default as StaffInvoiceDetailsPage } from './widget/StaffInvoiceDetailsPage'
export { default as StaffInvoiceListPage } from './widget/StaffInvoiceListPage'
export { default as StaffPaymentReconciliationToolPage } from './widget/StaffPaymentReconciliationToolPage'

export { default as StaffPaymentDetailsPage } from './widget/StaffPaymentDetailsPage'
export { default as StaffPaymentListPage } from './widget/StaffPaymentListPage'

export { default as StaffPurchaseOrderDetailsPage } from './widget/StaffPurchaseOrderDetailsPage'
export { default as StaffPurchaseOrderListPage } from './widget/StaffPurchaseOrderListPage'

export { default as StaffPurchaseOrderLineDetailsPage } from './widget/StaffPurchaseOrderLineDetailsPage'

export { default as StaffMemorandumListPage } from './widget/StaffMemorandumListPage'

export { default as StaffExpectedCommissionListPage } from './widget/StaffExpectedCommissionListPage'

export { default as StaffPaymentGroupDetailsPage } from './widget/StaffPaymentGroupDetailsPage'
export { default as StaffPaymentGroupListPage } from './widget/StaffPaymentGroupListPage'

export { default as StaffReceivedPaymentsPage } from './widget/StaffReceivedPaymentsPage'
export { default as StaffMyExpectedCommissionsPage } from './widget/StaffMyExpectedCommissionListPage'

// Company Profile Widgets
// TODO:
// Temporary export until topkit/apollo as a single data layer in place
export { default as StaffCompanyProfileWidget } from './widget/StaffCompanyProfileWidget'

export { default as StaffJobWidget } from './widget/StaffJobPage'

export {
  StaffInvoiceTaskCard,
  StaffPaymentTaskCard,
  StaffDashboardCommissionWidget,
  StaffBasicBillingInfoWidget,
  StaffBillingDetailsWidget,
  StaffBillingDetailsAddressWidget,
  StaffBillingInformationNotesWidget,
  StaffCommissionWidget,
  StaffBillingCycleSettingsWidget,
  StaffCommitmentChangeWidget,
  StaffBillingSettingsWidget,
  StaffEngagementWidget,
  StaffOverviewWidget,
  StaffBillingStatsWidget
} from '@staff-portal/billing-widgets'

export { BillingAppModalsPathsMap } from './billing-modals'
export { BILLING_MODALS_PATH_MAP } from '@staff-portal/billing/src/dependencies'

export { RECENT_ACTIVITY_BUTTON, RELATED_TASKS } from './dependencies'

export type {
  GQLEndpoints,
  GQLEndpoint,
  GQLEndpointKey
} from '@staff-portal/billing/src/@types/types'
