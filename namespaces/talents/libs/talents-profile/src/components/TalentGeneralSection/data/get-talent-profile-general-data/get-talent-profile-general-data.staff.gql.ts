/* eslint-disable max-lines */
import {
  filterThirdPartyErrors,
  filterUnauthorizedErrors,
  gql,
  useQuery,
  BATCH_KEY
} from '@staff-portal/data-layer-service'
import {
  WEB_RESOURCE_FRAGMENT,
  UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT
} from '@staff-portal/facilities'
import {
  TALENT_CURRENT_INTERVIEWS_FRAGMENT,
  ACTIVE_PAYMENT_HOLD_FRAGMENT,
  TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT,
  TALENT_PROFILE_INDUSTRY_SET_FRAGMENT,
  TALENT_JOB_PREFERENCES_FRAGMENT,
  TALENT_SPECIALIZATION_FIELD_FRAGMENT
} from '@staff-portal/talents'
import {
  OTHER_ROLE_FRAGMENT,
  PHONE_CONTACTS_FRAGMENT,
  ROLE_UNALLOCATED_MEMORANDUM_FRAGMENT
} from '@staff-portal/role-profile'

import { GetTalentProfileGeneralDataDocument } from './get-talent-profile-general-data.staff.gql.types'

export const GET_TALENT_PROFILE_GENERAL_DATA = gql`
  query GetTalentProfileGeneralData($talentId: ID!) {
    staffNode(id: $talentId) {
      ... on Talent {
        ...TalentProfileGeneralDataFragment
        ...TalentProfileGeneralDataTalentAvailabilityFragment
        associatedRoles(filter: { roleType: TALENT }) {
          nodes {
            ...TalentProfileGeneralDataTalentAvailabilityFragment
          }
        }
      }
    }
  }

  fragment TalentProfileGeneralDataFragment on Talent {
    id
    primarySkill {
      title
    }
    admissionPostUrl
    linkedinUrl
    otherRoles: associatedRoles(filter: {}) {
      nodes {
        ...OtherRoleFragment
      }
    }
    currentInterviews {
      ...TalentCurrentInterviewsFragment
    }
    sourcer {
      ... on Role {
        id
        __typename
      }
      ... on WebResource {
        webResource {
          text
          url
        }
      }
    }
    referrer {
      ... on Client {
        id
        __typename
      }
      ... on Role {
        id
        __typename
      }
      ... on WebResource {
        webResource {
          text
          url
        }
      }
    }
    talentPartner {
      id
      photo {
        small
      }
      webResource {
        text
        url
      }
    }
    talentPartnership {
      employmentStartDate
    }
    canIssueSourcingCommission
    profile: profileV2 {
      id
      website
      github
      industrySets {
        nodes {
          ...TalentProfileIndustrySetFragment
        }
      }
    }
    type
    roleTitle
    email
    toptalEmail
    slackContacts: contacts(filter: { type: [COMMUNITY_SLACK] }) {
      nodes {
        id
        webResource {
          text
          url
        }
      }
    }
    skypeContacts: contacts(filter: { type: [SKYPE] }) {
      nodes {
        id
        value
      }
    }
    additionalSkypeIds(order: { field: RECENCY, direction: DESC }) {
      nodes
    }
    supplyHealthModelData {
      priority
      snapshotAt
    }
    deltaWaitingDays
    lastClosedEngagementEndDate
    lastAvailabilityIncreaseDate
    engagements {
      counters {
        trialsNumber
        workingNumber
        clientsNumber
        repeatedClientsNumber
      }
    }
    twitter
    recentIdVerification {
      id
      status
      statusDisplayKey
      legalName
      selfieUrl
      remainingAttempts
      automaticMeetingCancellationCount
      reasonForPausingDisplayKey
    }
    legalName
    billingName
    useBillingName
    locationV2 {
      countryName
    }
    cityDescription
    timeZone {
      name
      value
    }
    citizenship {
      id
      name
    }
    cumulativeStatus
    eligibleForRestoration
    joinedAt
    applicationDetailsSubmittedAt
    activatedAt
    updatedAt
    reapplicationDate
    currentSignInAt
    currentSignInIp
    allocatedHours
    ipLocation: ipLocationV2 {
      cityName
      countryName
    }
    investigations {
      nodes {
        id
        startedAt
        resolvedAt
      }
    }
    tosAcceptedAt
    cocAcceptedAt
    workingTime {
      from
      to
    }
    availableShiftRange {
      from
      to
    }
    weeklyRate
    hourlyRate
    rateRecommendation {
      meanHour
      meanWeek
      quantity
    }
    predictedTimeZone {
      name
      value
    }
    ofacStatus
    visualComplianceStatus
    specialHandling
    signingBonusExpiresAt
    prescreeningRecordingUrl
    languages {
      nodes {
        id
        name
      }
    }
    billingNotes
    ...ActivePaymentHoldFragment
    applicantSkills {
      nodes {
        id
        name
      }
    }
    specializationApplications(filter: { statuses: [PENDING, APPROVED] }) {
      nodes {
        ...TalentSpecializationFieldFragment
      }
    }
    applicationInfo {
      id
      ...WebResourceFragment
    }
    vertical {
      id
      specializations {
        totalCount
      }
    }
    viewerActiveAvailabilitySubscription {
      ...TalentAvailabilitySubscriptionFragment
    }
    jobPreferences {
      ...TalentJobPreferencesFragment
    }
    ...RoleUnallocatedMemorandumFragment
    ...PhoneContactsFragment
  }

  fragment TalentProfileGeneralDataTalentAvailabilityFragment on Talent {
    id
    type
    roleTitle
    allocatedHoursAvailability(upcoming: true)
    allocatedHoursAvailabilityIncludingEndingEngagements: allocatedHoursAvailability(
      upcoming: false
    )
    availableHours(upcoming: true)
    availableHoursIncludingEndingEngagements: availableHours(upcoming: false)
    allocatedHours
    allocatedHoursConfirmedAt
    preliminarySearchSetting {
      enabled
    }
    unavailableAllocatedHoursChangeRequest {
      ...UnavailableAllocatedHoursChangeRequestFragment
    }
    endingEngagements {
      nodes {
        id
        endDate
        commitment
        ...WebResourceFragment
        proposedEnd {
          endDate
        }
        job {
          id
          claimer {
            id
            fullName
            ...WebResourceFragment
          }
        }
      }
    }
  }

  ${OTHER_ROLE_FRAGMENT}
  ${TALENT_CURRENT_INTERVIEWS_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${ACTIVE_PAYMENT_HOLD_FRAGMENT}
  ${TALENT_PROFILE_INDUSTRY_SET_FRAGMENT}
  ${TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT}
  ${TALENT_JOB_PREFERENCES_FRAGMENT}
  ${UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT}
  ${PHONE_CONTACTS_FRAGMENT}
  ${TALENT_SPECIALIZATION_FIELD_FRAGMENT}
  ${ROLE_UNALLOCATED_MEMORANDUM_FRAGMENT}
`

export const useGetTalentProfileGeneralData = (
  talentId: string,
  { batchKey }: { batchKey?: string } = {}
) => {
  const { data, ...restOptions } = useQuery(
    GetTalentProfileGeneralDataDocument,
    {
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors, filterThirdPartyErrors],
      variables: { talentId },
      context: { [BATCH_KEY]: batchKey }
    }
  )

  return { ...restOptions, talent: data?.staffNode }
}
