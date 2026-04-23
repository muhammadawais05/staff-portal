import { Client, InvestigationReason } from '@staff-portal/graphql/staff'

import { InvestigationAvailableReason } from '../../config'

export const INVESTIGATION_RESOLVE_OPERATION_NAME_MAP: Record<
  InvestigationAvailableReason,
  keyof Client['operations']
> = {
  [InvestigationReason.REPORTED_ISSUES]:
    'resolveClientReportedIssuesInvestigation',
  [InvestigationReason.PAYMENT_PROBLEM]:
    'resolveClientPaymentProblemInvestigation',
  [InvestigationReason.LEGAL]: 'resolveClientLegalInvestigation',
  [InvestigationReason.CLIENT_FEEDBACK]:
    'resolveClientClientFeedbackInvestigation',
  [InvestigationReason.CC_ACH_DISPUTE]:
    'resolveClientCcAchDisputeInvestigation',
  [InvestigationReason.MATCHING]: 'resolveClientMatchingInvestigation',
  [InvestigationReason.ACCOUNTING_ERROR]:
    'resolveClientAccountingErrorInvestigation',
  [InvestigationReason.OTHER]: 'resolveClientOtherInvestigation'
}
