import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'
import {
  COMPANY_OPERATION_FRAGMENT,
  COMPANY_CURRENT_INVESTIGATION_FRAGMENT
} from '@staff-portal/clients'

import { COMPANY_CONTACTS_FRAGMENT } from './company-contacts-fragment.staff.gql'
import { COMPANY_PARENT_FRAGMENT } from './company-parent-fragment.staff.gql'
import { COMPANY_ENTERPRISE_ACCOUNT_STATUS_FRAGMENT } from './enterprise-account-status-fragment.staff.gql'

export const COMPANY_OVERVIEW_FRAGMENT = gql`
  fragment CompanyOverviewFragment on Client {
    ...CompanyParentFragment
    ...CompanyEnterpriseAccountStatusFragment

    id
    fullName
    businessType: businessTypeV2
    email
    enterpriseLeadStatus
    enterpriseFollowUpStatus
    enterpriseFollowUpStatusComment
    website
    billingPhone
    salesPlaybookName
    actualSignDate
    salesforceLink {
      text
      url
    }
    companyHqPhone
    clientopedia {
      phone
    }
    billingOptionsUpdateEnabled
    onboardingPath
    accountPlan
    photo {
      small
    }
    currentNegotiation {
      id
      status
      rounds
      negotiationDays
    }
    webResource {
      url
      text
    }
    timeZone {
      ...TimeZoneFragment
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
    city
    contact {
      ...RoleOrClientFragment
      ...CompanyContactsFragment
    }
    hierarchyCategory
    legalName
    activeStaContract {
      id
      signatureReceivedAt
      webResource {
        url
        text
      }
      staTerms {
        standard
        terminationPeriodInDays
        terminationPeriodApplicable
      }
    }
    status
    ofacStatus
    visualComplianceStatus
    countAsLead
    discountEligible
    fullTimeDiscount
    partTimeDiscount
    leadSource
    signerEmail
    signerFullName
    tier
    primaryRegion {
      id
      name
    }
    secondaryRegion {
      id
      name
    }
    likelihoodToClose
    operations {
      ...CompanyOverviewOperationsFragment
    }
    cumulativeStatus
    ...CompanyCurrentInvestigation
  }

  fragment CompanyOverviewOperationsFragment on ClientOperations {
    patchClientProfile {
      ...CompanyOperationFragment
    }
    updateClientBusinessType {
      ...CompanyOperationFragment
    }
    updateClientLeadSource {
      ...CompanyOperationFragment
    }
    updateClientLegalName {
      ...CompanyOperationFragment
    }
    updateClientLegalContactDetails {
      ...CompanyOperationFragment
    }
    updateClientPrimaryRegion {
      ...CompanyOperationFragment
    }
    updateClientSecondaryRegion {
      ...CompanyOperationFragment
    }
    updateClientLikelihoodToClose {
      ...CompanyOperationFragment
    }
    addClientRoleFlag {
      ...CompanyOperationFragment
    }
    updateClientEnterpriseLeadStatus {
      ...CompanyOperationFragment
    }
    pushClientToSalesforce {
      ...CompanyOperationFragment
    }
    updateActualSignDate {
      ...CompanyOperationFragment
    }
    updateClientCountAsLead {
      ...CompanyOperationFragment
    }
    updateClientDiscountEligible {
      ...CompanyOperationFragment
    }
    deleteDuplicateClient {
      ...CompanyOperationFragment
    }
  }

  ${TIME_ZONE_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
  ${COMPANY_PARENT_FRAGMENT}
  ${COMPANY_CONTACTS_FRAGMENT}
  ${COMPANY_OPERATION_FRAGMENT}
  ${COMPANY_CURRENT_INVESTIGATION_FRAGMENT}
  ${COMPANY_ENTERPRISE_ACCOUNT_STATUS_FRAGMENT}
`
