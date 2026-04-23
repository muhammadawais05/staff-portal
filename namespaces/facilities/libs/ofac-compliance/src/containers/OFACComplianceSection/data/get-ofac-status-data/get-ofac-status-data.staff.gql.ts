import { gql, useQuery } from '@staff-portal/data-layer-service'
import { isAuthorizationError } from '@staff-portal/error-handling'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  GetOfacStatusDataDocument,
  OfacStatusDataClientFragment,
  OfacStatusDataTalentFragment,
  OfacStatusDataStaffFragment,
  OfacStatusDataCompanyRepresentativeFragment
} from './get-ofac-status-data.staff.gql.types'
import { OFAC_STATUS_CHANGE_FRAGMENT } from '../ofac-status-change-fragment'

export type OfacStatusData =
  | OfacStatusDataClientFragment
  | OfacStatusDataTalentFragment
  | OfacStatusDataStaffFragment
  | OfacStatusDataCompanyRepresentativeFragment

export const GET_OFAC_STATUS_DATA: typeof GetOfacStatusDataDocument = gql`
  query GetOfacStatusData($id: ID!) {
    node(id: $id) {
      ...OfacStatusDataTalentFragment
      ...OfacStatusDataClientFragment
      ...OfacStatusDataStaffFragment
      ...OfacStatusDataCompanyRepresentativeFragment
    }
  }

  fragment OfacStatusDataTalentFragment on Talent {
    id
    fullName
    talentCumulativeStatus: cumulativeStatus
    ofacStatus
    ofacStatusChanges(order: { direction: DESC, field: CREATED_AT }) {
      nodes {
        ...OfacStatusChangeFragment
      }
    }
    talentAssociatedRoles: associatedRoles(filter: {}) {
      nodes {
        ...AssociatedRoleFragment
        ...AssociatedClientFragment
      }
    }
    operations {
      updateRoleOfacStatus {
        ...OperationFragment
        __typename
      }
      __typename
    }
  }

  fragment OfacStatusDataCompanyRepresentativeFragment on CompanyRepresentative {
    id
    fullName
    ofacStatus
    cumulativeStatus
    associatedRoles(filter: {}) {
      nodes {
        ...AssociatedRoleFragment
        ...AssociatedClientFragment
      }
    }
    ofacStatusChanges(order: { direction: DESC, field: CREATED_AT }) {
      nodes {
        ...OfacStatusChangeFragment
      }
    }
    operations {
      updateRoleOfacStatus {
        ...OperationFragment
      }
    }
  }

  fragment OfacStatusDataClientFragment on Client {
    id
    fullName
    clientCumulativeStatus: cumulativeStatus
    ofacStatus
    ofacStatusChanges(order: { direction: DESC, field: CREATED_AT }) {
      nodes {
        ...OfacStatusChangeFragment
      }
    }
    clientAssociatedRoles: associatedRoles {
      nodes {
        ...AssociatedRoleFragment
        ...AssociatedClientFragment
      }
    }
    operations {
      updateClientOfacStatus {
        ...OperationFragment
      }
    }
  }

  fragment OfacStatusDataStaffFragment on Staff {
    id
    fullName
    staffCumulativeStatus: cumulativeStatus
    ofacStatus
    ofacStatusChanges(order: { direction: DESC, field: CREATED_AT }) {
      nodes {
        ...OfacStatusChangeFragment
      }
    }
    staffAssociatedRoles: associatedRoles(filter: {}) {
      nodes {
        ...AssociatedRoleFragment
        ...AssociatedClientFragment
      }
    }
    operations {
      updateRoleOfacStatus {
        ...OperationFragment
      }
    }
  }

  fragment AssociatedRoleFragment on Role {
    id
    type
    ...AssociatedCompanyRepresentativeFragment
    ...AssociatedTalentFragment
    ... on Staff {
      cumulativeStatus
    }
    ... on Leader {
      cumulativeStatus
    }
    ... on ReferralPartner {
      cumulativeStatus
    }
    ... on TalentPartner {
      cumulativeStatus
    }
  }

  fragment AssociatedTalentFragment on Talent {
    talentCumulativeStatus: cumulativeStatus
  }

  fragment AssociatedCompanyRepresentativeFragment on CompanyRepresentative {
    companyRepresentativeCumulativeStatus: cumulativeStatus
  }

  fragment AssociatedClientFragment on Client {
    id
    clientCumulativeStatus: cumulativeStatus
    type
  }

  ${OFAC_STATUS_CHANGE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

export const useGetOfacStatusData = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_OFAC_STATUS_DATA, {
    variables: { id },
    fetchPolicy: 'cache-first'
  })

  return {
    ofacData: data?.node,
    loading,
    refetch,
    // TODO: SPT-1505 Generic solution will be create in this ticket
    error: error && isAuthorizationError(error) ? undefined : error
  }
}
