// eslint-disable-next-line no-restricted-imports
import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'

import { RoutePath } from '../../enums'
import { RouteType } from '../../types'

export const generateRoute = <TParameters>(
  path: string | RoutePath
): RouteType<TParameters> => ({
  path
})

export const ROUTE_PATHS = {
  Dashboard: generateRoute(RoutePath.Dashboard),
  RoleEmailMessages: generateRoute<{ entityType: string; entityId: string }>(
    RoutePath.RoleEmailMessages
  ),
  EmailMessage: generateRoute<{ id: string }>(RoutePath.EmailMessage),
  EntityPerformedActions: generateRoute<{
    entityType: string
    entityId: string
  }>(RoutePath.EntityPerformedActions),
  RoleEmailMessage: generateRoute<{
    entityType: string
    entityId: string
    id: string
  }>(RoutePath.RoleEmailMessage),
  CallRequest: generateRoute<{ id: string }>(RoutePath.CallRequest),
  Meetings: generateRoute<{ category?: MeetingPeriodEnum }>(RoutePath.Meetings),
  ClientProfile: generateRoute<{ id: string }>(RoutePath.ClientProfile),
  CompanyRepresentative: generateRoute<{ id: string }>(
    RoutePath.CompanyRepresentative
  ),
  Opportunity: generateRoute<{ id: string }>(RoutePath.Opportunity),
  BillingInvoice: generateRoute<{ id: string }>(RoutePath.BillingInvoice),
  BillingPayment: generateRoute<{ id: string }>(RoutePath.BillingPayment),
  BillingPurchaseOrder: generateRoute<{ id: string }>(
    RoutePath.BillingPurchaseOrder
  ),
  BillingPaymentGroup: generateRoute<{ id: string }>(
    RoutePath.BillingPaymentGroup
  ),
  ReceivedPayments: generateRoute(RoutePath.ReceivedPayments),
  TalentProfile: generateRoute<{ id: string }>(RoutePath.TalentProfile),
  TalentCreate: generateRoute(RoutePath.TalentCreate),
  TalentUpdate: generateRoute<{ id: string }>(RoutePath.TalentUpdate),
  Job: generateRoute<{ id: string }>(RoutePath.Job),
  JobCreate: generateRoute<{ id: string }>(RoutePath.JobCreate),
  JobUpdate: generateRoute<{ id: string }>(RoutePath.JobUpdate),
  JobBilling: generateRoute<{ id: string }>(RoutePath.JobBilling),
  CandidateSending: generateRoute<{ id: string }>(RoutePath.CandidateSending),
  AddSourcingRequest: generateRoute<{ jobId: string }>(
    RoutePath.AddSourcingRequest
  ),
  Engagement: generateRoute<{ id: string }>(RoutePath.Engagement),
  EditSourcingRequest: generateRoute<{ id: string }>(
    RoutePath.EditSourcingRequest
  ),
  Calls: generateRoute(RoutePath.Calls),
  UnfilledCalls: generateRoute(RoutePath.UnfilledCalls),
  Request: generateRoute<{ id: string }>(RoutePath.Request),
  PeerRequest: generateRoute<{ id: string }>(RoutePath.PeerRequest),
  Skills: generateRoute(RoutePath.Skills),
  Quizzes: generateRoute(RoutePath.Quizzes),
  CreateCompanyRepresentative: generateRoute<{ clientId: string }>(
    RoutePath.CreateCompanyRepresentative
  ),
  EditCompanyRepresentative: generateRoute<{ id: string }>(
    RoutePath.EditCompanyRepresentative
  ),
  CommunityLeaders: generateRoute<{ id: string }>(RoutePath.CommunityLeaders),
  GigCandidatesSearch: generateRoute<{ id: string }>(
    RoutePath.GigCandidatesSearch
  ),
  VerticalSettings: generateRoute(RoutePath.VerticalSettings),
  AddVertical: generateRoute(RoutePath.AddVertical),
  EntityGlobalPerformedActions: generateRoute<{ entityType: string }>(
    RoutePath.EntityGlobalPerformedActions
  ),
  EmailTemplateUpdate: generateRoute<{ id: string }>(
    RoutePath.EmailTemplateUpdate
  ),
  EmailTemplate: generateRoute<{ id: string }>(RoutePath.EmailTemplate),
  Playbook: generateRoute<{ identifier: string }>(RoutePath.Playbook)
}
