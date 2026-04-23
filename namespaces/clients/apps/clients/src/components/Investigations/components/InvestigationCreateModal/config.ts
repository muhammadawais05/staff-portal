import { InvestigationReason } from '@staff-portal/graphql/staff'

export const INVESTIGATION_AVAILABLE_REASON_TYPE_TEXT_MAPPING = {
  [InvestigationReason.REPORTED_ISSUES]: 'Reported Issues',
  [InvestigationReason.PAYMENT_PROBLEM]: 'Payment problems',
  [InvestigationReason.LEGAL]: 'Legal',
  [InvestigationReason.CLIENT_FEEDBACK]: 'Client feedback',
  [InvestigationReason.CC_ACH_DISPUTE]: 'CC/ACH dispute',
  [InvestigationReason.MATCHING]: 'Matching',
  [InvestigationReason.ACCOUNTING_ERROR]: 'Accounting error',
  [InvestigationReason.OTHER]: 'Other'
}
