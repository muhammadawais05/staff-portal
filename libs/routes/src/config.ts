/* eslint-disable max-lines */
import { RouteAvailability, RouteExperimentKey, RoutePath } from './enums'
import { Route } from './types'

export const ROUTES: Route[] = [
  {
    cucumberMode: true,
    path: RoutePath.Root,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.BetaStaffUsers,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.Dashboard,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: [RoutePath.EmailMessages, RoutePath.RoleEmailMessages],
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: [RoutePath.EmailMessage, RoutePath.RoleEmailMessage],
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: [RoutePath.EntityPerformedActions],
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EntityHistory
  },
  {
    // please change this section's availability to live as well, whenever the above goes live
    cucumberMode: true,
    path: [RoutePath.EntityGlobalPerformedActions],
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EntityHistory
  },
  {
    cucumberMode: true,
    path: RoutePath.JobStation,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.CallRequests,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.CallRequest,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.MeetingProfile,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.MeetingProfile
  },
  {
    cucumberMode: true,
    path: RoutePath.Meetings,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.TalentScreeningSpecialistsTalents,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.Tasks,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.Playbook,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    cucumberMode: true,
    path: RoutePath.ApplicantCompanies,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.Clients,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.ClientHierarchy,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.ClientProfile,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.ClientProfile
  },
  {
    path: RoutePath.CompanyRepresentative,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.CompanyRepresentativeProfile
  },
  {
    path: RoutePath.CreateCompanyRepresentative,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.CompanyRepresentativeCreate
  },
  {
    path: RoutePath.EditCompanyRepresentative,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.CompanyRepresentativeUpdate
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingInvoices,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.BillingPaymentReconciliation,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingInvoice,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPayments,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPayment,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPurchaseOrders,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPurchaseOrder,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPurchaseOrderLine,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPurchaseOrderLineLegacy,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingMemorandums,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingExpectedCommissions,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.MyExpectedCommissions,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.MyExpectedCommissions
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPaymentGroups,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.BillingPaymentGroup,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.ReceivedPayments,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.SourcedTalents,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.SourcedTalents
  },
  {
    cucumberMode: true,
    path: RoutePath.Talents,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.Talents
  },
  {
    path: RoutePath.TalentProfile,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.TalentProfile
  },
  {
    path: RoutePath.TalentCreate,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.TalentCreate
  },
  {
    path: RoutePath.TalentUpdate,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.TalentUpdate
  },
  {
    path: RoutePath.JobApplication,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.Jobs,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.Job,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.JobCreate,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.JobCreate
  },
  {
    path: RoutePath.JobUpdate,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.JobBilling,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.CandidateSending,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.SourcingRequestList,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.SourcingRequestList
  },
  {
    path: RoutePath.AddSourcingRequest,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.EditSourcingRequest,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    cucumberMode: true,
    path: RoutePath.TalentInfractions,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.TalentsForCoaching,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.Requests,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.PeerRequests,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.Request,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.PeerRequest,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.Skills,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.Engagement,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.Calls,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.UnfilledCalls,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.PageNotFound,
    availability: RouteAvailability.RELEASED
  },
  {
    cucumberMode: true,
    path: RoutePath.Quizzes,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.Opportunity,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.CommunityLeaders,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.CommunityLeader,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.CommunityLeadersSort,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.CommunityEvents,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.CommunityEvent,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.CommunityEventTags,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    cucumberMode: true,
    path: RoutePath.GigCandidatesSearch,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.VerticalSettings,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.AddVertical,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.RateChangeRequests,
    availability: RouteAvailability.RELEASED
  },
  {
    path: RoutePath.Staff,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.Staff
  },
  {
    path: RoutePath.StaffProfile,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.StaffProfile
  },
  {
    path: RoutePath.Teams,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.TeamProfile,
    availability: RouteAvailability.IN_DEVELOPMENT
  },
  {
    path: RoutePath.EmailTemplates,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EmailTemplates
  },
  {
    path: RoutePath.EmailTemplateCreate,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EmailTemplates
  },
  {
    path: RoutePath.EmailTemplateHelp,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EmailTemplates
  },
  {
    path: RoutePath.TalentApplicants,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.TalentApplicants
  },
  {
    path: RoutePath.EmailTemplate,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EmailTemplates
  },
  {
    path: RoutePath.EmailTemplateUpdate,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.EmailTemplates
  },
  {
    path: RoutePath.TasksByClients,
    availability: RouteAvailability.BETA,
    experimentsKey: RouteExperimentKey.TasksByClients
  }
]
