import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  StaffBasicBillingInfoWidget,
  StaffBillingDetailsWidget,
  StaffBillingInformationNotesWidget,
  StaffCommissionWidget,
  StaffConsolidationDefaultsWidget
} from '@staff-portal/billing-widgets'

type Props = {
  companyId: string
}

const Billing = ({ companyId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <StaffBasicBillingInfoWidget companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <StaffBillingDetailsWidget companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <StaffConsolidationDefaultsWidget clientId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <StaffBillingInformationNotesWidget companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <StaffCommissionWidget nodeId={companyId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default Billing
