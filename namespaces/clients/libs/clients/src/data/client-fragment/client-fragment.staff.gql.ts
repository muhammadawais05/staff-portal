import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { ROLE_FLAG_FRAGMENT } from '@staff-portal/role-flags'

import { INTERNAL_TEAM_MATCHER_FRAGMENT } from '../internal-team-matcher-fragment/internal-team-matcher-fragment.staff.gql'

const COMPANY_APPLICANT_CONTACTS_FRAGMENT = gql`
  fragment CompanyApplicantContactsFragment on CompanyRepresentative {
    contacts(filter: { type: [PHONE, PHONE_WITH_NOTES] }) {
      nodes {
        id
        value
        note
        primary
        phoneCategory
      }
    }
  }
`

const COMPANY_APPLICANT_INVESTIGATION_FRAGMENT = gql`
  fragment CompanyApplicantInvestigationFragment on Client {
    investigations(filter: { current: true }) {
      nodes {
        id
        startedAt
      }
    }
  }
`

const CLIENT_OPERATIONS_LIST_FRAGMENT = gql`
  fragment CompanyOperationsListFragment on Client {
    operations {
      approveClient @include(if: $isClientsList) {
        ...OperationFragment
      }
      pauseClient @include(if: $isClientsList) {
        ...OperationFragment
      }
      repauseClient @include(if: $isClientsList) {
        ...OperationFragment
      }
      resumeClient @include(if: $isClientsList) {
        ...OperationFragment
      }
      createClientClaimer {
        ...OperationFragment
      }
      markClientAsBadLead {
        ...OperationFragment
      }
      restoreClientFromBadLead {
        ...OperationFragment
      }
      rejectClient {
        ...OperationFragment
      }
      restoreClient {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    fullName
    email
    status
    cumulativeStatus
    createdAt
    approvedAt
    claimableSince
    isNew
    obscureLead
    ofacProhibitedCumulative
    ofacStatus
    ofacStatusComment
    billingPhone
    photo {
      default
    }

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

    country {
      id
      name
    }
    contact {
      id
      fullName
      email
      skype
      lastLogin
      ...CompanyApplicantContactsFragment
    }
    claimer {
      id
      fullName
      webResource {
        url
        text
      }
    }
    matchers @include(if: $isClientsList) {
      edges {
        ...InternalTeamMatcherFragment
      }
    }
    salesAnalyst {
      id
      fullName
    }
    updatedAt
    pendingCallbackRequest {
      id
      type
      requestedStartTime
    }
    timeZone {
      ...TimeZoneFragment
    }
    webResource {
      text
      url
    }
    roleFlags {
      nodes {
        ...RoleFlagFragment
      }
    }
    businessType: businessTypeV2
    parent {
      id
      webResource {
        text
        url
      }
    }
    ...CompanyApplicantInvestigationFragment
    ...CompanyOperationsListFragment
  }

  ${COMPANY_APPLICANT_CONTACTS_FRAGMENT}
  ${COMPANY_APPLICANT_INVESTIGATION_FRAGMENT}
  ${CLIENT_OPERATIONS_LIST_FRAGMENT}
  ${ROLE_FLAG_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${INTERNAL_TEAM_MATCHER_FRAGMENT}
`
