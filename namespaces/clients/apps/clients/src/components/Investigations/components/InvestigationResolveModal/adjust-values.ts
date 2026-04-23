import {
  ResolveClientAccountingErrorInvestigationInput,
  ResolveClientCcAchDisputeInvestigationInput,
  ResolveClientChallengesWithEngagementInvestigationInput,
  ResolveClientReportedIssuesInvestigationInput,
  ResolveClientClientFeedbackInvestigationInput,
  ResolveClientLegalInvestigationInput,
  ResolveClientMatchingInvestigationInput,
  ResolveClientOtherInvestigationInput,
  ResolveClientPaymentProblemInvestigationInput
} from '@staff-portal/graphql/staff'

export const adjustValues = (
  values: Partial<
    | ResolveClientChallengesWithEngagementInvestigationInput
    | ResolveClientReportedIssuesInvestigationInput
    | ResolveClientClientFeedbackInvestigationInput
    | ResolveClientLegalInvestigationInput
    | ResolveClientOtherInvestigationInput
    | ResolveClientPaymentProblemInvestigationInput
    | ResolveClientAccountingErrorInvestigationInput
    | ResolveClientCcAchDisputeInvestigationInput
    | ResolveClientMatchingInvestigationInput
  >
) => {
  if ('netLoss' in values && values.netLoss === '') {
    delete values.netLoss
  }

  return values
}
