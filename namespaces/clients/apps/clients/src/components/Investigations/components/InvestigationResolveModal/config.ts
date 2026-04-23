import { Option } from '@toptal/picasso/Select'
import { InvestigationReason } from '@staff-portal/graphql/staff'
import { stringListToOptions } from '@staff-portal/string'

import {
  SetResolveClientReportedIssuesInvestigationDocument,
  SetResolveClientFeedbackInvestigationDocument,
  SetResolveClientLegalInvestigationDocument,
  SetResolveClientOtherInvestigationDocument,
  SetResolveClientPaymentProblemInvestigationDocument
} from './data'
import { SetResolveClientMatchingInvestigationDocument } from './data/set-investigation-resolve-matching.staff.gql.types'
import { SetResolveClientAccountingErrorInvestigationDocument } from './data/set-investigation-resolve-accounting-error.staff.gql.types'
import { SetResolveClientCcAchDisputeInvestigationDocument } from './data/set-investigation-resolve-cc-ach-dispute.staff.gql.types'

export const ISSUE_SOURCES = [
  'Quality of work was subpar',
  'Quality of talent’s communication was subpar',
  'Talent was too slow (Productivity)',
  'Client was not managing the project properly',
  'Client had unreasonable expectations',
  'We filtered client badly',
  'We matched the job badly',
  'Talent wanted to leave',
  'Client/Talent mismatch',
  'Incorrect logged hours',
  'Other'
]

const LEGAL_RESOLUTION = [
  'Contract negotiation successful',
  'Contract negotiation unsuccessful',
  'Problem handed off to Legal team',
  'Other'
]

const CLIENT_FEEDBACK_RESOLUTION = [
  'Talent coaching provided',
  'Company coaching provided',
  'Account closed',
  'Other'
]

const PAYMENT_PROBLEM_RESOLUTION = [
  'Client became current',
  'Client was sent to collections',
  'Client signed a payment plan',
  'Other'
]

const REPORTED_ISSUES_RESOLUTION = [
  'Talent replaced',
  'Talent not replaced',
  'Talent coaching provided',
  'Company coaching provided',
  'Account closed',
  'Issue self-resolved',
  'Other'
]

const CC_ACH_DISPUTE_RESOLUTION = [
  'Evidence submitted',
  'Agreement with client achieved',
  'Other'
]

const MATCHING_RESOLUTION = [
  'Issue resolved successfully',
  'Issue not resolved',
  'Other'
]

const ACCOUNTING_ERROR_RESOLUTION = [
  'Credit/refund provided',
  'Credit/refund not provided'
]

const RESOLVE_INVESTIGATION_RESOLUTIONS = {
  [InvestigationReason.CLIENT_FEEDBACK]: CLIENT_FEEDBACK_RESOLUTION,
  [InvestigationReason.LEGAL]: LEGAL_RESOLUTION,
  [InvestigationReason.PAYMENT_PROBLEM]: PAYMENT_PROBLEM_RESOLUTION,
  [InvestigationReason.REPORTED_ISSUES]: REPORTED_ISSUES_RESOLUTION,
  [InvestigationReason.CC_ACH_DISPUTE]: CC_ACH_DISPUTE_RESOLUTION,
  [InvestigationReason.MATCHING]: MATCHING_RESOLUTION,
  [InvestigationReason.ACCOUNTING_ERROR]: ACCOUNTING_ERROR_RESOLUTION,
  [InvestigationReason.OTHER]: undefined,
  [InvestigationReason.BUYOUT]: undefined
}

export const RESOLVE_INVESTIGATION_RESOLUTIONS_OPTIONS = Object.keys(
  RESOLVE_INVESTIGATION_RESOLUTIONS
).reduce((options, key) => {
  const investigationReason = key as keyof typeof RESOLVE_INVESTIGATION_RESOLUTIONS
  const data = RESOLVE_INVESTIGATION_RESOLUTIONS[investigationReason]

  if (!data) {
    return options
  }

  options[investigationReason] = stringListToOptions(data)

  return options
}, {} as Record<InvestigationReason, Option[]>)

export const MUTATION_DOCUMENT_MAPPING = {
  [InvestigationReason.REPORTED_ISSUES]:
    SetResolveClientReportedIssuesInvestigationDocument,
  [InvestigationReason.CLIENT_FEEDBACK]:
    SetResolveClientFeedbackInvestigationDocument,
  [InvestigationReason.LEGAL]: SetResolveClientLegalInvestigationDocument,
  [InvestigationReason.PAYMENT_PROBLEM]:
    SetResolveClientPaymentProblemInvestigationDocument,
  [InvestigationReason.CC_ACH_DISPUTE]:
    SetResolveClientCcAchDisputeInvestigationDocument,
  [InvestigationReason.MATCHING]: SetResolveClientMatchingInvestigationDocument,
  [InvestigationReason.ACCOUNTING_ERROR]:
    SetResolveClientAccountingErrorInvestigationDocument,
  [InvestigationReason.OTHER]: SetResolveClientOtherInvestigationDocument
}

export const getInitialValues = (
  investigationReason: InvestigationReason,
  clientId: string
) => {
  switch (investigationReason) {
    case InvestigationReason.REPORTED_ISSUES:
      return {
        initialRefund: '',
        refundProvided: '',
        netLoss: '',
        invoicesAdjusted: false,
        settlementAgreementSent: false,
        talentAtFault: false,
        talentPaymentsImpacted: false,
        lowValue: false,
        /**
         * TODO: Replace with paymentResolutionTypes enum
         * https://toptal-core.atlassian.net/browse/SPB-3117
         */
        paymentResolutionType: 'Refund',
        clientId
      }
    case InvestigationReason.LEGAL:
      return {
        settlementAgreementSent: false,
        clientId
      }
    default:
      return {
        clientId
      }
  }
}
