import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  OFACComplianceSection,
  OFAC_UPDATED
} from '@staff-portal/ofac-compliance'
import { StaffBillingDetailsAddressWidget } from '@staff-portal/billing-widgets'

import ContractsSection from '../ContractsSection'
import PublicAgreementsSection from '../PublicAgreementsSection'

type Props = {
  companyId: string
}

const Legal = ({ companyId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <OFACComplianceSection
          nodeId={companyId}
          sectionVariant='withHeaderBar'
          listenedMessages={[OFAC_UPDATED]}
        />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <PublicAgreementsSection companyId={companyId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <StaffBillingDetailsAddressWidget companyId={companyId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <ContractsSection companyId={companyId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default Legal
