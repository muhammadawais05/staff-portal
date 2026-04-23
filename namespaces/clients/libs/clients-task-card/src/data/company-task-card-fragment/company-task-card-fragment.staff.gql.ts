import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

import { CLIENT_LAST_LOGIN_FRAGMENT } from '../client-last-login-fragment'

const TASK_CARD_COMPANY_JOBS_FRAGMENT = gql`
  fragment TaskCardCompanyJobsFragment on Client {
    id
    totalJobs: jobs(filter: { statuses: [] }) {
      totalCount
    }
    activeJobs: jobs(filter: { statuses: [ACTIVE] }) {
      totalCount
    }
    jobsForVerticalsEngaged: jobs(filter: { statuses: [ACTIVE] }) {
      verticalsEngaged
    }
  }
`

const TASK_CARD_COMPANY_CONTACTS_FRAGMENT = gql`
  fragment TaskCardCompanyContactsFragment on CompanyRepresentative {
    id
    contacts(filter: { type: [EMAIL, PHONE, SKYPE] }) {
      nodes {
        id
        type
        value
      }
    }
  }
`

const TASK_CARD_COMPANY_NPS_SCORE_FRAGMENT = gql`
  fragment TaskCardCompanyNpsScoreFragment on Client {
    id
    lastAnsweredPromotion {
      score
      updatedAt
    }
    promotions {
      webResource {
        url
      }
    }
  }
`

const TASK_CARD_COMPANY_USER_ROLE_FLAGS_FRAGMENT = gql`
  fragment TaskCardCompanyUserRoleFlagsFragment on Client {
    flags: roleFlags {
      nodes {
        id
        flag {
          id
          title
        }
        comment
        flaggedBy {
          id
          fullName
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const TASK_CARD_COMPANY_CURRENT_INVESTIGATION_FRAGMENT = gql`
  fragment TaskCardCompanyCurrentInvestigation on Client {
    id
    investigations(filter: { current: true }) {
      nodes {
        id
        startedAt
      }
    }
  }
`

const TASK_CARD_COMPANY_OPERATIONS_FRAGMENT = gql`
  fragment TaskCardCompanyOperationsFragment on Client {
    operations {
      blackFlagClient {
        ...OperationFragment
      }
      markClientAsBadLead {
        ...OperationFragment
      }
      pauseClient {
        ...OperationFragment
      }
      repauseClient {
        ...OperationFragment
      }
      resumeClient {
        ...OperationFragment
      }
      updateProfileClient {
        ...OperationFragment
      }
      rejectClient {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const COMPANY_REPRESENTATIVE_FRAGMENT = gql`
  fragment CompanyRepresentativeFragment on CompanyRepresentative {
    id
    invitedToLoginAt
    client {
      id
      portalPermissionsEnabled
    }
    operations {
      inviteToLoginCompanyRepresentative {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`

export const TASK_CARD_COMPANY_INVOICES_FRAGMENT = gql`
  fragment TaskCardCompanyInvoicesFragment on Client {
    id
    invoices(filter: { statuses: [] }, pagination: { offset: 0, limit: 1 }) {
      totalAmount
    }
    overdueInvoices: invoices(
      filter: { statuses: [], overdue: true }
      pagination: { offset: 0, limit: 1 }
    ) {
      totalCount
    }
  }
`

/**
 * Must be used for `tasks` module only, DO NOT EVER use it into `companies` module
 * TODO: leave only fields required for task card
 */
export const TASK_CARD_COMPANY_FRAGMENT = gql`
  fragment TaskCardCompanyFragment on Client {
    id
    fullName
    businessType: businessTypeV2
    claimableSince
    createdAt
    cumulativeStatus
    daysInFunnel
    email
    interestedIn
    reviewStatus
    twitter
    website
    applicationInfo {
      id
      ...WebResourceFragment
    }
    claimer {
      ...RoleOrClientFragment
    }
    contact {
      ...RoleOrClientFragment
      ...TaskCardCompanyContactsFragment
      ...CompanyRepresentativeFragment
    }
    country {
      id
      name
    }
    city

    leadPotential {
      leadProbabilityBucket
    }

    scoreExplanation {
      negativeFeatures {
        name
        position
        value
      }
      positiveFeatures {
        name
        position
        value
      }
    }

    photo {
      thumb
    }
    referrer {
      ...RoleOrClientFragment
    }
    reviewAttempts {
      totalCount
    }
    timeZone {
      ...TimeZoneFragment
    }
    engagements(filter: { inStatusHistory: [ACTIVE, END_SCHEDULED] }) {
      totalCount
    }
    billingVerifiedAt
    updateProfileUrl
    companyLegacyId

    ...TaskCardCompanyNpsScoreFragment
    ...TaskCardCompanyUserRoleFlagsFragment
    ...TaskCardCompanyJobsFragment
    ...ClientLastLoginFragment
    ...TaskCardCompanyCurrentInvestigation
    ...TaskCardCompanyOperationsFragment
    ...TaskCardCompanyInvoicesFragment
    webResource {
      url
      text
    }
  }

  ${COMPANY_REPRESENTATIVE_FRAGMENT}
  ${CLIENT_LAST_LOGIN_FRAGMENT}
  ${TASK_CARD_COMPANY_CONTACTS_FRAGMENT}
  ${TASK_CARD_COMPANY_JOBS_FRAGMENT}
  ${TASK_CARD_COMPANY_NPS_SCORE_FRAGMENT}
  ${TASK_CARD_COMPANY_USER_ROLE_FLAGS_FRAGMENT}
  ${TASK_CARD_COMPANY_CURRENT_INVESTIGATION_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
  ${TASK_CARD_COMPANY_OPERATIONS_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${TASK_CARD_COMPANY_INVOICES_FRAGMENT}
`
