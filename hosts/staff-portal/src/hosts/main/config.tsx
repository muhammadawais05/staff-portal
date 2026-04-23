/* eslint-disable max-lines */
import React, { ReactNode } from 'react'
import { Redirect } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { lazy } from '@staff-portal/utils'

const Overview = lazy(() => import('./pages/Overview/Overview'))
const NotFound = lazy(() => import('./pages/NotFoundPage'))
const EmailMessageList = lazy(
  () =>
    import(
      '@staff-portal/communication-tracking-app/src/pages/EmailMessageList'
    )
)
const EmailMessage = lazy(
  () =>
    import('@staff-portal/communication-tracking-app/src/pages/EmailMessage')
)

const JobStation = lazy(
  () => import('@staff-portal/jobs-station-app/src/pages/JobStation/JobStation')
)

const CallRequestList = lazy(
  () =>
    import('@staff-portal/clients-call-requests-app/src/pages/CallRequestList')
)

const CallRequest = lazy(
  () => import('@staff-portal/clients-call-requests-app/src/pages/CallRequest')
)

const MeetingProfile = lazy(
  () => import('@staff-portal/meetings-app/src/pages/MeetingProfile')
)

const MeetingList = lazy(
  () => import('@staff-portal/meetings-app/src/pages/MeetingList')
)

const SourcedTalents = lazy(
  () =>
    import(
      '@staff-portal/talents-app/src/sourced-talents-page/pages/SourcedTalents/SourcedTalents'
    )
)

const TalentScreeningSpecialistsTalentList = lazy(
  () =>
    import(
      '@staff-portal/talents-screening-specialists-app/src/pages/TalentList/TalentList'
    )
)

const TasksPage = lazy(
  () => import('@staff-portal/tasks-app/src/pages/TasksPage')
)

const Playbook = lazy(
  () => import('@staff-portal/tasks-app/src/pages/Playbook')
)

const TasksByClientsPage = lazy(
  () =>
    import(
      '@staff-portal/clients-tasks-app/src/pages/TasksByClientsPage/TasksByClientsPage'
    )
)

const TalentProfile = lazy(
  () => import('@staff-portal/talents-app/src/talent-page/pages/Talent')
)

const TalentCreate = lazy(
  () =>
    import(
      '@staff-portal/talents-app/src/talent-create-page/pages/TalentCreatePage'
    )
)

const TalentUpdate = lazy(
  () =>
    import(
      '@staff-portal/talents-app/src/talent-update-page/pages/TalentUpdatePage'
    )
)

const TalentList = lazy(
  () =>
    import('@staff-portal/talents-app/src/talent-list-page/pages/TalentList')
)

const TalentInfractions = lazy(
  () =>
    import(
      '@staff-portal/talents-infractions-app/src/pages/TalentInfractionsList'
    )
)

const TalentCoachingList = lazy(
  () =>
    import('@staff-portal/talents-coaching-app/src/pages/TalentCoachingList')
)

const CompanyApplicants = lazy(
  () =>
    import(
      '@staff-portal/clients-app/src/applicants-page/pages/CompanyApplicants'
    )
)

const Clients = lazy(
  () => import('@staff-portal/clients-app/src/clients-page/pages/Clients')
)

const ClientProfile = lazy(
  () => import('@staff-portal/clients-app/src/profile-page/pages/ClientProfile')
)

const ClientHierarchy = lazy(
  () =>
    import('@staff-portal/clients-app/src/hierarchy-page/pages/ClientHierarchy')
)

const CompanyRepresentative = lazy(
  () =>
    import(
      '@staff-portal/client-representatives-app/src/pages/Representative/Representative'
    )
)

const CreateCompanyRepresentative = lazy(
  () =>
    import(
      '@staff-portal/client-representatives-app/src/pages/CreateRepresentative/CreateRepresentative'
    )
)

const EditCompanyRepresentative = lazy(
  () =>
    import(
      '@staff-portal/client-representatives-app/src/pages/EditRepresentative/EditRepresentative'
    )
)

const JobApplication = lazy(
  () =>
    import(
      '@staff-portal/jobs-applications-app/src/job-application-page/pages/JobApplication'
    )
)

const JobPage = lazy(
  () => import('@staff-portal/jobs-app/src/job-page/pages/JobPage')
)

const JobsList = lazy(
  () => import('@staff-portal/jobs-app/src/job-list-page/pages/JobsList')
)

const JobBilling = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffBillingSettingsPage')
)

const JobCreate = lazy(
  () => import('@staff-portal/jobs-app/src/job-create-page/pages/JobCreate')
)

const JobEdit = lazy(
  () => import('@staff-portal/jobs-app/src/job-edit-page/pages/JobEdit')
)

const CandidateSendingPage = lazy(
  () =>
    import(
      '@staff-portal/engagements-app/src/pages/candidate-sending/CandidateSendingPage'
    )
)

const SourcingRequestList = lazy(
  () =>
    import(
      '@staff-portal/jobs-sourcing-requests-app/src/pages/SourcingRequestList'
    )
)

const AddSourcingRequest = lazy(
  () =>
    import(
      '@staff-portal/jobs-sourcing-requests-app/src/pages/AddSourcingRequest'
    )
)

const EditSourcingRequest = lazy(
  () =>
    import(
      '@staff-portal/jobs-sourcing-requests-app/src/pages/EditSourcingRequest'
    )
)

const BillingInvoicesList = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffInvoiceListPage')
)
const BillingInvoice = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffInvoiceDetailsPage')
)
const BillingReconciliation = lazy(
  () =>
    import(
      '@toptal/billing-frontend/src/widget/StaffPaymentReconciliationToolPage'
    )
)
const BillingPaymentList = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffPaymentListPage')
)
const BillingPayment = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffPaymentDetailsPage')
)
const BillingPurchaseOrderList = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffPurchaseOrderListPage')
)
const BillingPurchaseOrder = lazy(
  () =>
    import('@toptal/billing-frontend/src/widget/StaffPurchaseOrderDetailsPage')
)

const BillingPurchaseOrderLine = lazy(
  () =>
    import(
      '@toptal/billing-frontend/src/widget/StaffPurchaseOrderLineDetailsPage'
    )
)
const BillingMemorandumList = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffMemorandumListPage')
)

const BillingExpectedCommissionList = lazy(
  () =>
    import(
      '@toptal/billing-frontend/src/widget/StaffExpectedCommissionListPage'
    )
)

const BillingPaymentGroup = lazy(
  () =>
    import('@toptal/billing-frontend/src/widget/StaffPaymentGroupDetailsPage')
)

const BillingPaymentGroupList = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffPaymentGroupListPage')
)

const ReceivedPayments = lazy(
  () => import('@toptal/billing-frontend/src/widget/StaffReceivedPaymentsPage')
)

const SkillsList = lazy(
  () => import('@staff-portal/skills-app/src/pages/SkillsList/')
)

const PublicationRequests = lazy(
  () =>
    import(
      '@staff-portal/talents-publication-gigs/src/pages/PublicationRequests'
    )
)

const PublicationRequest = lazy(
  () =>
    import(
      '@staff-portal/talents-publication-gigs/src/pages/PublicationRequest'
    )
)

const Engagement = lazy(
  () =>
    import(
      '@staff-portal/engagements-app/src/pages/engagement-page/pages/EngagementProfilePage/EngagementProfilePage'
    )
)

const Calls = lazy(() => import('@staff-portal/calls-app/src/pages/CallList'))

const UnfilledCalls = lazy(
  () => import('@staff-portal/calls-app/src/pages/UnfilledCallList')
)

const Opportunity = lazy(
  () =>
    import(
      '@staff-portal/opportunities-app/src/opportunity-page/pages/OpportunityPage'
    )
)

const Quizzes = lazy(
  () => import('@staff-portal/quizzes-app/src/pages/QuizzesPage')
)

const BetaStaffMembers = lazy(
  () =>
    import('@staff-portal/staff-beta-members-app/src/pages/BetaStaffMembers')
)

const CommunityLeaders = lazy(
  () => import('@staff-portal/community-leaders-app/src/pages/CommunityLeaders')
)

const CommunityLeader = lazy(
  () => import('@staff-portal/community-leaders-app/src/pages/CommunityLeader')
)

const CommunityLeadersSort = lazy(
  () =>
    import('@staff-portal/community-leaders-app/src/pages/CommunityLeadersSort')
)

const CommunityEvents = lazy(
  () =>
    import(
      '@staff-portal/community-events-app/src/pages/CommunityEvents/CommunityEvents'
    )
)

const CommunityEvent = lazy(
  () =>
    import(
      '@staff-portal/community-events-app/src/pages/CommunityEvent/CommunityEvent'
    )
)

const CommunityEventTags = lazy(
  () =>
    import('@staff-portal/community-events-app/src/pages/EventTags/EventTags')
)

const GigCandidatesSearch = lazy(
  () =>
    import(
      '@staff-portal/talents-gig-candidates-app/src/pages/GigCandidatesSearch/GigCandidatesSearch'
    )
)

const MyExpectedCommissions = lazy(
  () =>
    import(
      '@toptal/billing-frontend/src/widget/StaffMyExpectedCommissionListPage'
    )
)

const VerticalSettings = lazy(
  () => import('@staff-portal/talents-verticals-app/src/pages/VerticalSettings')
)

const AddVertical = lazy(
  () => import('@staff-portal/talents-verticals-app/src/pages/AddVertical')
)

const RateChangeRequestList = lazy(
  () =>
    import(
      '@staff-portal/talents-rate-change-requests-app/src/pages/RateChangeRequestList'
    )
)

const EntityPerformedActionsList = lazy(
  () =>
    import(
      '@staff-portal/performed-actions-app/src/pages/EntityPerformedActionsListPage/EntityPerformedActionsListPage'
    )
)

const EntityGlobalPerformedActionsListPage = lazy(
  () =>
    import(
      '@staff-portal/performed-actions-app/src/pages/EntityGlobalPerformedActionsListPage/EntityGlobalPerformedActionsListPage'
    )
)
const StaffProfile = lazy(
  () => import('@staff-portal/staff-app/src/pages/StaffProfile/StaffProfile')
)

const StaffList = lazy(
  () => import('@staff-portal/staff-app/src/pages/StaffList/StaffList')
)

const TeamsList = lazy(
  () => import('@staff-portal/staff-app/src/pages/TeamsList/TeamsList')
)

const TeamProfile = lazy(
  () => import('@staff-portal/staff-app/src/pages/TeamProfile/TeamProfile')
)

const EmailTemplatesList = lazy(
  () =>
    import(
      '@staff-portal/communication-email-templates-app/src/pages/EmailTemplatesList/EmailTemplatesList'
    )
)

const EmailTemplatePage = lazy(
  () =>
    import(
      '@staff-portal/communication-email-templates-app/src/pages/EmailTemplatePage/EmailTemplatePage'
    )
)

const EmailTemplateCreate = lazy(
  () =>
    import(
      '@staff-portal/communication-email-templates-app/src/pages/EmailTemplateCreate/EmailTemplateCreate'
    )
)

const EmailTemplateHelp = lazy(
  () =>
    import(
      '@staff-portal/communication-email-templates-app/src/pages/EmailTemplateHelp/EmailTemplateHelp'
    )
)

const TalentApplicants = lazy(
  () =>
    import(
      '@staff-portal/talents-app/src/applicants-page/pages/TalentApplicants'
    )
)

const EmailTemplateUpdate = lazy(
  () =>
    import(
      '@staff-portal/communication-email-templates-app/src/pages/EmailTemplateUpdatePage/EmailTemplateUpdatePage'
    )
)

export const RoutesMapping: Record<RoutePath, ReactNode> = {
  [RoutePath.Root]: <Redirect to={RoutePath.Dashboard} />,
  [RoutePath.BetaStaffUsers]: <BetaStaffMembers />,
  [RoutePath.Dashboard]: <Overview />,
  [RoutePath.EmailMessages]: <EmailMessageList />,
  [RoutePath.RoleEmailMessages]: <EmailMessageList />,
  [RoutePath.EmailMessage]: <EmailMessage />,
  [RoutePath.RoleEmailMessage]: <EmailMessage />,
  [RoutePath.JobStation]: <JobStation />,
  [RoutePath.CallRequests]: <CallRequestList />,
  [RoutePath.CallRequest]: <CallRequest />,
  [RoutePath.MeetingProfile]: <MeetingProfile />,
  [RoutePath.Meetings]: <MeetingList />,
  [RoutePath.TalentScreeningSpecialistsTalents]: (
    <TalentScreeningSpecialistsTalentList />
  ),
  [RoutePath.Tasks]: <TasksPage />,
  [RoutePath.TasksByClients]: <TasksByClientsPage />,
  [RoutePath.Playbook]: <Playbook />,
  [RoutePath.ApplicantCompanies]: <CompanyApplicants />,
  [RoutePath.Clients]: <Clients />,
  [RoutePath.ClientProfile]: <ClientProfile />,
  [RoutePath.ClientHierarchy]: <ClientHierarchy />,
  [RoutePath.CompanyRepresentative]: <CompanyRepresentative />,
  [RoutePath.Opportunity]: <Opportunity />,
  [RoutePath.CreateCompanyRepresentative]: <CreateCompanyRepresentative />,
  [RoutePath.EditCompanyRepresentative]: <EditCompanyRepresentative />,
  [RoutePath.BillingInvoices]: <BillingInvoicesList />,
  [RoutePath.BillingInvoice]: <BillingInvoice />,
  [RoutePath.BillingPaymentReconciliation]: <BillingReconciliation />,
  [RoutePath.BillingPayments]: <BillingPaymentList />,
  [RoutePath.BillingPayment]: <BillingPayment />,
  [RoutePath.BillingPurchaseOrders]: <BillingPurchaseOrderList />,
  [RoutePath.BillingPurchaseOrder]: <BillingPurchaseOrder />,
  [RoutePath.BillingPurchaseOrderLine]: <BillingPurchaseOrderLine />,
  [RoutePath.BillingPurchaseOrderLineLegacy]: <BillingPurchaseOrderLine />,
  [RoutePath.BillingMemorandums]: <BillingMemorandumList />,
  [RoutePath.BillingExpectedCommissions]: <BillingExpectedCommissionList />,
  [RoutePath.BillingPaymentGroups]: <BillingPaymentGroupList />,
  [RoutePath.BillingPaymentGroup]: <BillingPaymentGroup />,
  [RoutePath.ReceivedPayments]: <ReceivedPayments />,
  [RoutePath.MyExpectedCommissions]: <MyExpectedCommissions />,
  [RoutePath.SourcedTalents]: <SourcedTalents />,
  [RoutePath.Talents]: <TalentList />,
  [RoutePath.GigCandidatesSearch]: <GigCandidatesSearch />,
  [RoutePath.TalentsForCoaching]: <TalentCoachingList />,
  [RoutePath.TalentProfile]: <TalentProfile />,
  [RoutePath.TalentCreate]: <TalentCreate />,
  [RoutePath.TalentUpdate]: <TalentUpdate />,
  [RoutePath.JobApplication]: <JobApplication />,
  [RoutePath.Jobs]: <JobsList />,
  [RoutePath.Job]: <JobPage />,
  [RoutePath.JobCreate]: <JobCreate />,
  [RoutePath.JobUpdate]: <JobEdit />,
  [RoutePath.JobBilling]: <JobBilling />,
  [RoutePath.CandidateSending]: <CandidateSendingPage />,
  [RoutePath.SourcingRequestList]: <SourcingRequestList />,
  [RoutePath.AddSourcingRequest]: <AddSourcingRequest />,
  [RoutePath.EditSourcingRequest]: <EditSourcingRequest />,
  [RoutePath.TalentInfractions]: <TalentInfractions />,
  [RoutePath.Requests]: <PublicationRequests />,
  [RoutePath.PeerRequests]: <PublicationRequests />,
  [RoutePath.Skills]: <SkillsList />,
  [RoutePath.Request]: <PublicationRequest />,
  [RoutePath.PeerRequest]: <PublicationRequest />,
  [RoutePath.Engagement]: <Engagement />,
  [RoutePath.Calls]: <Calls />,
  [RoutePath.UnfilledCalls]: <UnfilledCalls />,
  [RoutePath.PageNotFound]: <NotFound />,
  [RoutePath.Quizzes]: <Quizzes />,
  [RoutePath.CommunityLeaders]: <CommunityLeaders />,
  [RoutePath.CommunityLeader]: <CommunityLeader />,
  [RoutePath.CommunityLeadersSort]: <CommunityLeadersSort />,
  [RoutePath.CommunityEvents]: <CommunityEvents />,
  [RoutePath.CommunityEvent]: <CommunityEvent />,
  [RoutePath.CommunityEventTags]: <CommunityEventTags />,
  [RoutePath.AddVertical]: <AddVertical />,
  [RoutePath.VerticalSettings]: <VerticalSettings />,
  [RoutePath.RateChangeRequests]: <RateChangeRequestList />,
  [RoutePath.EntityPerformedActions]: <EntityPerformedActionsList />,
  [RoutePath.EntityGlobalPerformedActions]: (
    <EntityGlobalPerformedActionsListPage />
  ),
  [RoutePath.Staff]: <StaffList />,
  [RoutePath.StaffProfile]: <StaffProfile />,
  [RoutePath.Teams]: <TeamsList />,
  [RoutePath.TeamProfile]: <TeamProfile />,
  [RoutePath.EmailTemplates]: <EmailTemplatesList />,
  [RoutePath.TalentApplicants]: <TalentApplicants />,
  [RoutePath.EmailTemplate]: <EmailTemplatePage />,
  [RoutePath.EmailTemplateCreate]: <EmailTemplateCreate />,
  [RoutePath.EmailTemplateUpdate]: <EmailTemplateUpdate />,
  [RoutePath.EmailTemplateHelp]: <EmailTemplateHelp />,
  [RoutePath.TalentApplicants]: <TalentApplicants />
}
