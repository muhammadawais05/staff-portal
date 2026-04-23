/* eslint-disable max-lines */
import { QueryStringParams } from '@staff-portal/navigation'
import { LEGACY_STAFF_PORTAL_URL, PLATFORM_API_URL } from '@staff-portal/config'
import {
  MeetingPeriodEnum,
  PlaybookName,
  SkillRating,
  TaskFilterStatus
} from '@staff-portal/graphql/staff'

import { RoutePath, JobTabUrlHash } from '../../enums'
import PATH_REWRITE_RULES from '../../rewrite-path'
import generateRoutePath from '../generate-route-path'
import rewritePath from '../rewrite-path'
import { generateRoute, ROUTE_PATHS } from './route-paths'

// Legacy url
export const getLegacyUrl = (path: string) =>
  `${LEGACY_STAFF_PORTAL_URL}${path}`

export const getDashboardPath = () => generateRoutePath(ROUTE_PATHS.Dashboard)

export const getLegacyUrlWithRewrite = (
  pathname: string,
  search = '',
  hash = ''
) => {
  const path =
    rewritePath(PATH_REWRITE_RULES, { pathname, search, hash }) ??
    `${pathname}${search}${hash}`

  return getLegacyUrl(path)
}

// Login / logout
export const getLoginUrl = ({ returnUrl }: { returnUrl?: string } = {}) => {
  const basePath = `${PLATFORM_API_URL}/users/login`

  return returnUrl
    ? `${basePath}?return_url=${encodeURIComponent(returnUrl)}`
    : basePath
}
export const getTosNotAcceptedPath = ({
  returnUrl
}: { returnUrl?: string } = {}) => {
  const basePath = '/platform/tos'

  return returnUrl
    ? `${basePath}?return_url=${encodeURIComponent(returnUrl)}`
    : basePath
}
export const getLogoutPath = () => '/users/logout'

// Meetings
export const buildMeetingsPath = (meetingCategory?: MeetingPeriodEnum) => {
  const category =
    meetingCategory === MeetingPeriodEnum.today ? undefined : meetingCategory

  return generateRoutePath(ROUTE_PATHS.Meetings, { parameters: { category } })
}

// Tasks
export const getTasksPath = ({
  performerId,
  playbooks,
  statuses
}: {
  performerId?: string
  playbooks?: PlaybookName[]
  statuses?: TaskFilterStatus[]
} = {}) =>
  generateRoutePath(RoutePath.Tasks, {
    searchParams: {
      performer_id: performerId,
      playbooks: playbooks?.map(val => val.toLowerCase()),
      statuses: statuses?.map(val => val.toLowerCase())
    }
  })

// Billing Packages paths
// Billing Invoices
export const getBillingInvoicesPath = (searchParams: QueryStringParams = {}) =>
  generateRoutePath(RoutePath.BillingInvoices, { searchParams })
export const getBillingInvoicePath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.BillingInvoice, {
    parameters: { id }
  })

// Billing Payment
export const getBillingPaymentListPath = (
  searchParams: QueryStringParams = {}
) => generateRoutePath(RoutePath.BillingPayments, { searchParams })
export const getBillingPaymentPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.BillingPayment, { parameters: { id } })

// Billing PurchaseOrder
export const getBillingPurchaseOrderListPath = (
  searchParams: QueryStringParams = {}
) => generateRoutePath(RoutePath.BillingPurchaseOrders, { searchParams })
export const getBillingPurchaseOrderPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.BillingPurchaseOrder, { parameters: { id } })

// Billing Memorandums
export const getBillingMemorandumListPath = (
  searchParams: QueryStringParams = {}
) => generateRoutePath(RoutePath.BillingMemorandums, { searchParams })

// Billing ExpectedCommission
export const getBillingExpectedCommissionList = (
  searchParams: QueryStringParams = {}
) => generateRoutePath(RoutePath.BillingExpectedCommissions, { searchParams })

// Billing BillingPaymentGroup
export const getBillingPaymentGroup = (id: string) =>
  generateRoutePath(ROUTE_PATHS.BillingPaymentGroup, {
    parameters: { id }
  })
export const getBillingPaymentGroupList = (
  searchParams: QueryStringParams = {}
) => generateRoutePath(RoutePath.BillingPaymentGroups, { searchParams })

// Operational issues
export enum OperationalIssuesPathEscalated {
  ESCALATED = 'escalated',
  NON_ESCALATED = 'non_escalated'
}
export enum OperationalIssuesPathOwnedBy {
  ME = 'me',
  TEAM = 'team',
  ALL = 'all'
}
export enum OperationalIssuesPathStatus {
  PENDING = 'pending',
  CLAIMED = 'claimed',
  RESOLVED = 'resolved',
  APPROVED = 'approved',
  REOPENED = 'reopened'
}

export const getOperationalIssuesPath = ({
  escalated,
  ownedBy,
  status
}: {
  escalated?: OperationalIssuesPathEscalated
  ownedBy?: OperationalIssuesPathOwnedBy
  status?: OperationalIssuesPathStatus[]
}) =>
  generateRoutePath('/operational_issues', {
    searchParams: {
      escalated: escalated,
      owned_by: ownedBy,
      status: status
    }
  })

export const getOperationalIssuePath = (id: string) =>
  generateRoutePath(
    generateRoute<{ id: string }>('/operational_issues/:id(\\d+)'),
    {
      parameters: { id }
    }
  )

// Call Requests
export const getCallRequestPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.CallRequest, { parameters: { id } })

// Client Profile
export const getClientProfilePath = (
  id: string,
  { section }: { section?: COMPANY_PATH_SECTION | string } = {}
) => {
  const basePath = generateRoutePath(ROUTE_PATHS.ClientProfile, {
    parameters: { id }
  })

  return section ? `${basePath}#${section}` : basePath
}

// Clients list
export const getCreateClientPath = () =>
  generateRoutePath(`${RoutePath.Clients}/create`)

// Opportunities
export const getOpportunityPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.Opportunity, { parameters: { id } })

// Jobs
export const getJobsPath = (searchParams: QueryStringParams = {}) =>
  generateRoutePath(RoutePath.Jobs, { searchParams })
export const getJobPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.Job, { parameters: { id } })

export const getJobSourcingRequestPath = (id: string) => {
  const jobPath = generateRoutePath(ROUTE_PATHS.Job, { parameters: { id } })

  return `${jobPath}#${JobTabUrlHash.SOURCING_REQUEST.toString()}`
}

export const getJobEditPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.JobUpdate, { parameters: { id } })

export const getJobCreatePath = (companyId: number) =>
  generateRoutePath(ROUTE_PATHS.JobCreate, {
    searchParams: { company_id: companyId.toString() }
  })

export const getCandidateSendingPath = ({
  jobId,
  talentId
}: {
  jobId?: string
  talentId?: string
} = {}) =>
  generateRoutePath(ROUTE_PATHS.CandidateSending, {
    searchParams: {
      engagement: {
        job_id: jobId,
        talent_id: talentId
      }
    }
  })

// Booking
export const getBookingPath = (bookingPage: string) =>
  generateRoutePath(
    generateRoute<{ bookingPage: string }>('/booking/:bookingPage'),
    { parameters: { bookingPage } }
  )

export const getTalentProfilePath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.TalentProfile, {
    parameters: { id }
  })

// TODO: extend the list of URL parameters
export const getTalentsPath = ({ claimerId }: { claimerId?: string } = {}) =>
  generateRoutePath(RoutePath.Talents, {
    searchParams: { claimer_id: claimerId }
  })

export const getCreateTalentProfilePath = (talentType: string) =>
  generateRoutePath(RoutePath.TalentCreate, {
    searchParams: { _talent: talentType }
  })

export const getUpdateTalentProfilePath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.TalentUpdate, { parameters: { id } })

export const getEmailTemplateCreatePath = (templateId?: string) =>
  generateRoutePath(`${RoutePath.EmailTemplateCreate}`, {
    searchParams: { template_id: templateId }
  })

export const getEmailTemplateHelpPath = () =>
  generateRoutePath(`${RoutePath.EmailTemplateHelp}`)

export const getEmailTemplatesPath = () =>
  generateRoutePath(`${RoutePath.EmailTemplates}`)

export const getTalentPaymentsPath = (talentId: string) =>
  generateRoutePath(RoutePath.BillingPayments, {
    searchParams: { 'badges[payee_ids][]': talentId }
  })

export const getTalentsSearchPathBySkill = (
  skill: string,
  skillRating?: SkillRating
) => {
  const rating = String(skillRating ?? SkillRating.COMPETENT).toLowerCase()

  return generateRoutePath(RoutePath.Talents, {
    searchParams: {
      [`badges[skills][${rating}][]`]: skill,
      logic: 'and',
      'sort[order]': 'desc',
      'sort[target]': 'relevance'
    }
  })
}

export const getTalentsSearchPathByIndustry = (industry: string) => {
  return generateRoutePath(RoutePath.Talents, {
    searchParams: {
      [`badges[industries][]`]: industry,
      logic: 'and',
      'sort[order]': 'desc',
      'sort[target]': 'relevance'
    }
  })
}

export const getJobsSearchPathBySkill = (skill: string) => {
  return generateRoutePath(RoutePath.Jobs, {
    searchParams: {
      [`badges[skills][]`]: skill,
      logic: 'and',
      'sort[order]': 'desc',
      'sort[target]': 'relevance'
    }
  })
}

export const getTalentsIndustriesPath = (industry: string) =>
  generateRoutePath(RoutePath.Talents, {
    searchParams: {
      'badges[industries][]': industry,
      logic: 'and',
      'sort[order]': 'desc',
      'sort[target]': 'relevance'
    }
  })

export enum COMPANY_PATH_SECTION {
  CALL_REQUESTS = 'callback-requests'
}

// Communication Tracking
export const getRoleEmailMessagesPath = (roleType: string, roleId: string) =>
  generateRoutePath(ROUTE_PATHS.RoleEmailMessages, {
    parameters: { entityType: roleType, entityId: roleId }
  })
export const getEmailMessagePath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.EmailMessage, { parameters: { id } })
export const getRoleEmailMessagePath = (
  roleType: string,
  roleId: string,
  id: string
) =>
  generateRoutePath(ROUTE_PATHS.RoleEmailMessage, {
    parameters: { entityType: roleType, entityId: roleId, id }
  })

// P2P Requests
export const getRequestPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.Request, { parameters: { id } })

// Company Representative
export const getCompanyRepresentativePath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.CompanyRepresentative, {
    parameters: { id }
  })

export const getCreateCompanyRepresentativePath = (clientId: string) => {
  return generateRoutePath(ROUTE_PATHS.CreateCompanyRepresentative, {
    parameters: { clientId }
  })
}

export const getEditCompanyRepresentativePath = (
  id: string,
  returnPath?: string
) => {
  return generateRoutePath(ROUTE_PATHS.EditCompanyRepresentative, {
    searchParams: { return_path: returnPath },
    parameters: { id }
  })
}

export const getEditStaffProfilePath = (id: string) => {
  return generateRoutePath('/platform/update_profile', {
    searchParams: { role_id: id }
  })
}

export const getCompanyApplicantsPath = () =>
  generateRoutePath(RoutePath.ApplicantCompanies)

export const getReferralUsersPath = () => generateRoutePath('/referrals/users')

// Performed Actions
export const getPerformedActionsPath = () => '/platform/performed_actions'

export const getEntityPerformedActionsPath = (
  entityType: string,
  entityId: string,
  searchParams: QueryStringParams = {}
) =>
  generateRoutePath(
    generateRoute<{ entityType: string; entityId: string }>(
      RoutePath.EntityPerformedActions
    ),
    { parameters: { entityType, entityId }, searchParams }
  )

// Transfer work
export const getTransferredWorkPath = () =>
  generateRoutePath('/transfer_work/transferred')

// Staff
export const getStaffProfilePath = (id: string) =>
  generateRoutePath(generateRoute<{ id: string }>('/staff/:id(\\d+)'), {
    parameters: { id }
  })

// Update profile
export const getUpdateProfilePath = () => generateRoutePath('/update_profile')

// Not Found page
export const getNotFoundPath = () => '/404'

// Sourcing Request page
export const getAddSourcingRequestPath = (jobId: string) =>
  generateRoutePath(ROUTE_PATHS.AddSourcingRequest, {
    searchParams: { job_id: jobId }
  })

// Sourcing Request edit page
export const getEditSourcingRequest = (id: string) =>
  generateRoutePath(ROUTE_PATHS.EditSourcingRequest, { parameters: { id } })

export const getCommunityLeadersProfilePath = (id: string) =>
  generateRoutePath(generateRoute<{ id: string }>('/community_leaders/:id'), {
    parameters: { id }
  })

export const getSortCommunityLeadersPath = () =>
  generateRoutePath('/community_leaders/active/sort')

export const getEntityGlobalPerformedActionsPath = (
  entityType: string,
  searchParams: QueryStringParams = {}
) =>
  generateRoutePath(
    generateRoute<{ entityType: string }>(
      RoutePath.EntityGlobalPerformedActions
    ),
    { parameters: { entityType }, searchParams }
  )

export const getUnfilledCallsPath = () => generateRoutePath('/calls/unfilled')

export const getEmailTemplateEditPath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.EmailTemplateUpdate, { parameters: { id } })

export const getEmailTemplatePath = (id: string) =>
  generateRoutePath(ROUTE_PATHS.EmailTemplate, { parameters: { id } })

export const getPlaybookPath = (identifier: string) =>
  generateRoutePath(ROUTE_PATHS.Playbook, { parameters: { identifier } })

export const getEditPermissionsPath = (id: string) =>
  generateRoutePath(
    generateRoute<{ id: string }>(`/permissions/:id(\\d+):_?/edit`),
    {
      parameters: { id }
    }
  )
