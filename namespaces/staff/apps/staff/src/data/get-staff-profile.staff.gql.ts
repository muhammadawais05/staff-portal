import { gql, useQuery } from '@staff-portal/data-layer-service'
import { URL_WITH_MESSAGES_FRAGMENT } from '@staff-portal/facilities'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { OTHER_ROLE_FRAGMENT } from '@staff-portal/role-profile'

import { GetStaffProfileDocument } from './get-staff-profile.staff.gql.types'

export default gql`
  query GetStaffProfile($staffProfileId: ID!) {
    node(id: $staffProfileId) {
      ... on Staff {
        ...StaffProfileFragment
        emailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }
        paymentsUrl {
          ...UrlWithMessagesFragment
        }
        emailMessagesUrl
        referralsUrl
        editDayoffsPage {
          ...UrlWithMessagesFragment
        }
        editAbilitiesPage {
          ...UrlWithMessagesFragment
        }
        gdprReportUrl
      }
    }
  }
  fragment StaffProfileFragment on Staff {
    id
    about
    fullName
    email
    createdAt
    updatedAt
    currentSignInAt
    currentSignInIp
    ipLocation: ipLocationV2 {
      cityName
      countryName
    }
    billingNotes
    paymentsFrequency
    paymentsEmployeeType
    unallocatedMemorandum: unallocatedMemorandums {
      totalAmount
      webResource {
        text
        url
      }
    }
    teams {
      nodes {
        id
        name
        manager {
          role {
            id
          }
        }
      }
    }
    languages {
      nodes {
        id
        name
      }
    }
    paymentOptions: paymentOptionsNullable {
      manageLink {
        text
        url
      }
      viewLink {
        text
        url
      }
      nodes {
        accountInfo {
          label
          value
        }
        paymentMethod
        placeholder
        preferred
      }
    }
    tosAcceptedAt
    website
    phoneNumber
    skype
    jobTitle
    legalName
    ofacStatus
    visualComplianceStatus
    otherRoles: associatedRoles(filter: {}) {
      nodes {
        ...OtherRoleFragment
      }
    }
    cumulativeStatus: cumulativeStatusV2
    location: locationV2 {
      countryName
    }
    twilioNumber
    cityDescription
    timeZone {
      ...TimeZoneFragment
    }
    citizenship {
      name
    }
    twitterLink {
      text
      url
    }
    webResource {
      url
    }
    operations {
      addRoleFlag {
        ...OperationFragment
      }
    }
    photo {
      default
    }
    meetingSchedulers {
      totalCount
      nodes {
        code
        flags
        webResource {
          text
          url
        }
      }
    }
    webResource {
      url
    }
    operations {
      updateProfileStaff {
        ...OperationFragment
      }
      deactivateStaff {
        ...OperationFragment
      }
      reactivateStaff {
        ...OperationFragment
      }
      loginAs {
        ...OperationFragment
      }
      downloadRolePaymentHistory {
        ...OperationFragment
      }
      updateBillingNotes {
        ...OperationFragment
      }
      updatePaymentsEmployeeType {
        ...OperationFragment
      }
      updatePaymentsFrequency {
        ...OperationFragment
      }
    }
  }

  fragment StaffProfileAssociatedRoleFragment on Staff {
    id
    type
  }

  ${OTHER_ROLE_FRAGMENT}
  ${URL_WITH_MESSAGES_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`

export const useGetStaffProfile = (staffProfileId: string) => {
  const { data, loading, initialLoading, error, refetch } = useQuery(
    GetStaffProfileDocument,
    {
      variables: { staffProfileId },
      throwOnError: true
    }
  )

  return {
    staffProfile: data?.node,
    loading,
    refetch,
    error,
    initialLoading
  }
}
