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

export const StaffInvoiceTaskCard = widgetPage('StaffInvoiceTaskCard')
export const StaffPaymentTaskCard = widgetPage('StaffPaymentTaskCard')
export const StaffEngagementWidget = widgetPage('StaffEngagementPage')
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
export const StaffCommitmentChangeWidget = widgetPage(
  'StaffCommitmentChangeWidget'
)
export const StaffBillingCycleSettingsWidget = widgetPage(
  'StaffBillingCycleSettingsWidget'
)
export const StaffBillingSettingsWidget = widgetPage('StaffBillingSettingsPage')

export type GQLEndpointKey = 'default' | 'empty'
export interface GQLEndpoint {
  uri: string
  authType?: 'token' | 'cookie' | 'implicit'
  authValue?: string | null
}
export type GQLEndpoints = Record<GQLEndpointKey, GQLEndpoint>
