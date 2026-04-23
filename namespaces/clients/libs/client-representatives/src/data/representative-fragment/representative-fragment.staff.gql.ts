import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { URL_WITH_MESSAGES_FRAGMENT } from '@staff-portal/facilities'

import { REPRESENTATIVE_JOB_FRAGMENT } from '../representative-job-fragment/representative-job-fragment.staff.gql'
import { REPRESENTATIVE_OPPORTUNITY_FRAGMENT } from '../representative-opportunity-fragment/representative-opportunity-fragment.staff.gql'

export const REPRESENTATIVE_FRAGMENT = gql`
  fragment Representative on CompanyRepresentative {
    id

    # viewer permissions
    viewerCanViewHistory

    photo {
      small
      __typename
    }

    # persons name
    fullName

    # persons link
    ...WebResourceTypeFragment

    # company name
    client {
      id
      portalPermissionsEnabled
      ...WebResourceTypeFragment
      __typename
    }
    noLongerPartOfCompany

    # last login
    currentSignInAt: lastLogin
    currentSignInIp
    ipLocation: ipLocationV2 {
      ...RepresentativeIpLocation
    }

    # languages
    languages {
      nodes {
        id
        name
      }
    }

    # country/city
    location: locationV2 {
      ...RepresentativeLocation
    }

    status
    position
    skype
    main
    information
    about
    linkedin
    phoneNumberNotes
    twitter
    zoominfoProfile
    cumulativeStatus
    communicationOptions
    callRecordingAccepted
    invitedToLoginAt
    gdprReportUrl
    paymentsUrl {
      ...UrlWithMessagesFragment
    }

    salesforceLink {
      url
      text
    }

    createdAt
    activatedAt
    updatedAt
    tosAcceptedAt

    # nps score
    lastAnsweredPromotion {
      score
      updatedAt
    }
    lastAnsweredPromotionUrl

    # ofac
    ofacStatus
    visualComplianceStatus

    billingCommunication
    disabledCommunicationOptions
    disabledBillingCommunicationOptions

    portalEnabled
    contactInvitable
    readBillingReport

    timeZone {
      name
      value
      __typename
    }

    jobs(filter: { current: true }, order: { field: ID, direction: DESC }) {
      nodes {
        ...RepresentativeJob
      }
      __typename
    }

    jobsWithBillingNotification: jobs(
      filter: { current: true, withBillingNotification: true }
    ) {
      nodes {
        ...RepresentativeJob
      }
      __typename
    }

    contacts(filter: { type: [PHONE, PHONE_WITH_NOTES, EMAIL] }) {
      nodes {
        ...RepresentativeContact
      }
      __typename
    }

    opportunities(order: { direction: DESC, field: UPDATED_AT }) {
      nodes {
        ...RepresentativeOpportunity
      }
      __typename
    }

    operations {
      ...RepresentativeOperationsFragment
    }

    mergedInto {
      id
      ...WebResourceTypeFragment
      __typename
    }

    __typename
  }

  fragment WebResourceTypeFragment on WebResource {
    webResource {
      text
      url
      __typename
    }
  }

  fragment RepresentativeContact on Contact {
    id
    value
    phoneCategory
    note
    primary
    type
    __typename
  }

  fragment RepresentativeIpLocation on IpLocation {
    cityName
    countryName

    __typename
  }

  fragment RepresentativeLocation on Location {
    country {
      id
      name
    }
    cityName

    __typename
  }

  fragment RepresentativeOperationsFragment on CompanyRepresentativeOperations {
    addRoleFlag {
      ...OperationFragment
    }
    inviteToLoginCompanyRepresentative {
      ...OperationFragment
    }
    loginAs {
      ...OperationFragment
    }
    updateCompanyRepresentativeProfile {
      ...OperationFragment
    }
    assignCompanyRepresentativeToJob {
      ...OperationFragment
    }
    markCompanyRepresentativeAsPrimary {
      ...OperationFragment
    }
    deactivateCompanyRepresentative {
      ...OperationFragment
    }
    reactivateCompanyRepresentative {
      ...OperationFragment
    }
    createConversationForStaff {
      ...OperationFragment
    }
    linkOpportunityCompanyRepresentative {
      ...OperationFragment
    }
    updateRolePhoto {
      ...OperationFragment
    }
  }

  ${REPRESENTATIVE_JOB_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${REPRESENTATIVE_OPPORTUNITY_FRAGMENT}
  ${URL_WITH_MESSAGES_FRAGMENT}
`
