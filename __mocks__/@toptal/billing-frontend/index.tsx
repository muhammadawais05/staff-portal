import React from 'react'
interface Props {
  [key: string]: object | string | boolean
}

export const widgetPage = (name: string) => (props: Props) =>
  (
    <div data-testid={name}>
      {Object.entries(props).map(([key, value]) => (
        <span key={key} data-testid={`${name}-${key.toLowerCase()}`}>
          {typeof value === 'string' ? value : JSON.stringify(value)}
        </span>
      ))}
    </div>
  )

export const StaffExpectedCommissionListPage = widgetPage(
  'StaffExpectedCommissionListPage'
)
export const StaffInvoiceDetailsPage = widgetPage('StaffInvoiceDetailsPage')
export const StaffInvoiceListPage = widgetPage('StaffInvoiceListPage')
export const StaffInvoiceTaskCard = widgetPage('StaffInvoiceTaskCard')
export const StaffMemorandumListPage = widgetPage('StaffMemorandumListPage')
export const StaffPaymentDetailsPage = widgetPage('StaffPaymentDetailsPage')
export const StaffPaymentGroupDetailsPage = widgetPage(
  'StaffPaymentGroupDetailsPage'
)
export const StaffPaymentGroupListPage = widgetPage('StaffPaymentGroupListPage')
export const StaffPaymentListPage = widgetPage('StaffPaymentListPage')
export const StaffPaymentTaskCard = widgetPage('StaffPaymentTaskCard')
export const StaffPurchaseOrderDetailsPage = widgetPage(
  'StaffPurchaseOrderDetailsPage'
)
export const StaffPurchaseOrderLineDetailsPage = widgetPage(
  'StaffPurchaseOrderLineDetailsPage'
)
export const StaffReceivedPaymentsPage = widgetPage('StaffReceivedPaymentsPage')
export const StaffMyExpectedCommissionListPage = widgetPage(
  'StaffMyExpectedCommissionListPage'
)
export const StaffEngagementPage = widgetPage('StaffEngagementPage')
export const StaffPurchaseOrderListPage = widgetPage(
  'StaffPurchaseOrderListPage'
)
export const StaffBillingStatsWidget = widgetPage('StaffBillingStatsWidget')
export const StaffDashboardCommissionWidget = widgetPage(
  'StaffDashboardCommissionWidget'
)

export const StaffBasicBillingInfoWidget = widgetPage(
  'StaffBasicBillingInfoWidget'
)
export const StaffBillingDetailsWidget = widgetPage('StaffBillingDetailsWidget')
export const StaffBillingDetailsAddressWidget = widgetPage(
  'StaffBillingDetailsAddressWidget'
)
export const StaffBillingInformationNotesWidget = widgetPage(
  'StaffBillingInformationNotesWidget'
)
export const StaffCommissionWidget = widgetPage('StaffCommissionWidget')
export const StaffOverviewWidget = widgetPage('StaffOverviewWidget')
export const StaffOverviewPage = widgetPage('StaffOverviewPage')
export const StaffCommitmentChangeWidget = widgetPage(
  'StaffCommitmentChangeWidget'
)
export const StaffBillingCycleSettingsWidget = widgetPage(
  'StaffBillingCycleSettingsWidget'
)
export const StaffBillingSettingsPage = widgetPage('StaffBillingSettingsPage')

export type GQLEndpointKey = 'default' | 'empty'
export interface GQLEndpoint {
  uri: string
  authType?: 'token' | 'cookie' | 'implicit'
  authValue?: string | null
}
export type GQLEndpoints = Record<GQLEndpointKey, GQLEndpoint>
