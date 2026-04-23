import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { INTERNAL_TEAM_MATCHER_FRAGMENT } from '@staff-portal/clients'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

import { GetInternalTeamDataDocument } from './get-internal-team-data.staff.gql.types'

export const INTERNAL_TEAM_FRAGMENT = gql`
  fragment InternalTeamFragment on Client {
    id
    businessType: businessTypeV2
    cumulativeStatus
    claimerCategory
    clientPartnerCategory
    relationshipManager {
      ...StaffUserFragment
    }
    projectRelationshipManager {
      ...StaffUserFragment
    }
    projectDeliveryManager {
      ...StaffUserFragment
    }
    salesAnalyst {
      ...StaffUserFragment
    }
    matchingOperationsCoordinator {
      ...StaffUserFragment
    }
    accountManager {
      ...StaffUserFragment
    }
    projectSalesSpecialist {
      ...StaffUserFragment
    }
    claimer {
      ...StaffUserFragment
    }
    salesDevelopmentRepresentative {
      ...StaffUserFragment
    }
    enterpriseSalesExecutive {
      ...StaffUserFragment
    }
    accountOwner {
      ...StaffUserFragment
    }
    matchers {
      edges {
        ...InternalTeamMatcherFragment
      }
    }
    clientPartner {
      ...StaffUserFragment
    }
    financeTeamMember {
      ...StaffUserFragment
    }
    operations {
      ...InternalTeamOperationsFragment
    }
  }

  fragment InternalTeamOperationsFragment on ClientOperations {
    updateClientSalesAnalyst {
      ...OperationFragment
    }
    updateClientClaimerCategory {
      ...OperationFragment
    }
    updateClientRelationshipManager {
      ...OperationFragment
    }
    updateProjectRelationshipManager {
      ...OperationFragment
    }
    updateProjectDeliveryManager {
      ...OperationFragment
    }
    updateMatchingOperationsCoordinator {
      ...OperationFragment
    }
    updateAccountManager {
      ...OperationFragment
    }
    updateProjectSalesSpecialist {
      ...OperationFragment
    }
    selectClientClaimer {
      ...OperationFragment
    }
    requestClientClaimerTransfer {
      ...OperationFragment
    }
    requestClientAccountManagerTransfer {
      ...OperationFragment
    }
    requestClientRelationshipManagerTransfer {
      ...OperationFragment
    }
    updateClientPartnerCategory {
      ...OperationFragment
    }
    updateClientSalesDevelopmentRepresentative {
      ...OperationFragment
    }
    updateClientEnterpriseSalesExecutive {
      ...OperationFragment
    }
    updateClientAccountOwner {
      ...OperationFragment
    }
    updateClientMatcher {
      ...OperationFragment
    }
    selectClientClientPartner {
      ...CompanyOperationFragment
    }
    updateClientClientPartner {
      ...CompanyOperationFragment
    }
    updateClientFinanceTeamMember {
      ...CompanyOperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
  ${INTERNAL_TEAM_MATCHER_FRAGMENT}
`

export const GET_INTERNAL_TEAM_DATA = gql`
  query GetInternalTeamData($nodeId: ID!) {
    node(id: $nodeId) {
      ...InternalTeamFragment
    }
  }

  ${INTERNAL_TEAM_FRAGMENT}
`

export const useGetInternalTeam = (nodeId: string) => {
  const { data, ...restOptions } = useGetNode(GetInternalTeamDataDocument)({
    nodeId
  })

  return { ...restOptions, data }
}
