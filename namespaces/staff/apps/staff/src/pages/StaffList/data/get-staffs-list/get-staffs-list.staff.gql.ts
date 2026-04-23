import { gql, useGetData } from '@staff-portal/data-layer-service'
import { STAFF_OPERATION_RESULT_FRAGMENT } from '@staff-portal/staff'

import {
  GetStaffsListDocument,
  GetStaffsListQueryVariables
} from './get-staffs-list.staff.gql.types'

export const GET_STAFFS_LIST = gql`
  fragment StaffListItemFragment on Staff {
    id
    fullName
    roleTitle
    webResource {
      url
    }
    photo {
      thumb
    }
    email
    phoneNumber
    skype
    activatedAt
    locationV2 {
      country {
        id
        name
      }
    }
    currentSignInAt
    currentSignInIp
    ipLocationV2 {
      cityName
      countryName
      stateName
    }
    timeZone {
      name
    }
    teams {
      nodes {
        id
        name
      }
    }
    ...StaffOperationResultFragment
  }

  query GetStaffsList(
    $pagination: OffsetPagination!
    $order: StaffOrder
    $filter: StaffFilter!
  ) {
    staffs(pagination: $pagination, order: $order, filter: $filter) {
      totalCount
      nodes {
        id
        ...StaffListItemFragment
      }
    }
  }
  ${STAFF_OPERATION_RESULT_FRAGMENT}
`

export const useGetStaffsList = (
  variables?: GetStaffsListQueryVariables,
  skip?: boolean
) => {
  const result = useGetData(GetStaffsListDocument, 'staffs')(variables, {
    skip,
    throwOnError: true
  })

  return result
}
