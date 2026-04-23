import { gql, useQuery } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import {
  OTHER_ROLE_FRAGMENT,
  PHONE_CONTACTS_FRAGMENT,
  ROLE_UNALLOCATED_MEMORANDUM_FRAGMENT
} from '@staff-portal/role-profile'

import {
  GetStaffGeneralDataDocument,
  GetStaffGeneralDataQueryVariables
} from './get-staff-general-data.staff.gql.types'

export default gql`
  query GetStaffGeneralData($id: ID!) {
    staffNode(id: $id) {
      ... on Staff {
        ...StaffProfileGeneralDataFragment
        associatedRoles(filter: { roleType: STAFF }) {
          nodes {
            ...StaffProfileGeneralDataTalentAvailabilityFragment
          }
        }
      }
    }
  }

  fragment StaffProfileGeneralDataFragment on Staff {
    id
    otherRoles: associatedRoles(filter: {}) {
      nodes {
        ...OtherRoleFragment
      }
    }
    canIssueSourcingCommission
    type
    email
    fullName
    slackContacts: contacts(filter: { type: [COMMUNITY_SLACK] }) {
      nodes {
        id
        webResource {
          text
          url
        }
      }
    }
    ...PhoneContactsFragment
    skypeContacts: contacts(filter: { type: [SKYPE] }) {
      nodes {
        id
        value
      }
    }
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

    activatedAt

    currentSignInAt
    currentSignInIp

    ipLocation: ipLocationV2 {
      cityName
      countryName
    }

    ofacStatus
    visualComplianceStatus

    languages {
      nodes {
        id
        name
      }
    }
    billingNotes
    ...RoleUnallocatedMemorandumFragment

    applicationInfo {
      id
      ...WebResourceFragment
    }
  }

  fragment StaffProfileGeneralDataTalentAvailabilityFragment on Staff {
    id
    type
  }

  ${OTHER_ROLE_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${PHONE_CONTACTS_FRAGMENT}
  ${OTHER_ROLE_FRAGMENT}
  ${ROLE_UNALLOCATED_MEMORANDUM_FRAGMENT}
`

export const useGetStaffGeneralData = ({
  id
}: GetStaffGeneralDataQueryVariables) => {
  const { data, loading, error } = useQuery(GetStaffGeneralDataDocument, {
    variables: {
      id
    },
    throwOnError: true
  })

  return {
    data: data?.staffNode,
    loading,
    error
  }
}
