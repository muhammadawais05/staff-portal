import {
  JobStatus,
  InvestigationReason,
  NegotiationStatus,
  NegotiationPendingStatus
} from '@staff-portal/graphql/staff'
import { NEGOTIATION_STATUS_TEXT_MAPPING } from '@staff-portal/clients'

export const INVESTIGATION_AVAILABLE_REASONS = [
  InvestigationReason.REPORTED_ISSUES,
  InvestigationReason.PAYMENT_PROBLEM,
  InvestigationReason.LEGAL,
  InvestigationReason.CLIENT_FEEDBACK,
  InvestigationReason.CC_ACH_DISPUTE,
  InvestigationReason.MATCHING,
  InvestigationReason.ACCOUNTING_ERROR,
  InvestigationReason.OTHER
] as const

export type InvestigationAvailableReason =
  typeof INVESTIGATION_AVAILABLE_REASONS[number]

export const INVESTIGABLE_JOB_STATUSES = [JobStatus.ACTIVE, JobStatus.CLOSED]

export const NEGOTIATION_STATUS_OPTIONS = [
  {
    text: NEGOTIATION_STATUS_TEXT_MAPPING[NegotiationStatus.WAITING_ON_CLIENT],
    value: NegotiationPendingStatus.WAITING_ON_CLIENT
  },
  {
    text: NEGOTIATION_STATUS_TEXT_MAPPING[NegotiationStatus.WAITING_ON_TOPTAL],
    value: NegotiationPendingStatus.WAITING_ON_TOPTAL
  }
]
