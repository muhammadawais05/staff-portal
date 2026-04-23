import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const OPPORTUNITY_TEAM_FRAGMENT = gql`
  fragment OpportunityTeamFragment on Opportunity {
    id
    enterprise
    type
    salesClaimer {
      ...StaffUserFragment
    }
    accountManager {
      ...StaffUserFragment
    }
    clientPartner {
      ...StaffUserFragment
    }
    projectDeliveryManager {
      ...StaffUserFragment
    }
    projectSalesSpecialist {
      ...StaffUserFragment
    }
    projectRelationshipManager {
      ...StaffUserFragment
    }
    relationshipManager {
      ...StaffUserFragment
    }
    owner {
      ...StaffUserFragment
    }
    sdr {
      ...StaffUserFragment
    }
    matcherDesigner: matcherFor(role: "designer") {
      id
      fullName
    }
    matcherDeveloper: matcherFor(role: "developer") {
      id
      fullName
    }
    matcherProductManager: matcherFor(role: "product_manager") {
      id
      fullName
    }
    client {
      id
      claimerCategory
      clientPartnerCategory
      financeTeamMember {
        ...StaffUserFragment
      }
      operations {
        ...ClientOperationsFragment
      }
    }

    operations {
      ...OpportunityTeamOperationsFragment
    }
  }

  fragment OpportunityTeamOperationsFragment on OpportunityOperations {
    updateOpportunitySalesClaimer {
      ...OperationFragment
    }
    updateOpportunityClientPartner {
      ...OperationFragment
    }
    updateOpportunityAccountManager {
      ...OperationFragment
    }
    updateOpportunityProjectDeliveryManager {
      ...OperationFragment
    }
    updateOpportunitySdr {
      ...OperationFragment
    }
    updateOpportunityRelationshipManager {
      ...OperationFragment
    }
    updateOpportunityProjectRelationshipManager {
      ...OperationFragment
    }
    updateOpportunityProjectSalesSpecialist {
      ...OperationFragment
    }
  }

  fragment ClientOperationsFragment on ClientOperations {
    updateClientFinanceTeamMember {
      ...OperationFragment
    }
    updateClientClaimerCategory {
      ...OperationFragment
    }
    updateClientPartnerCategory {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
`

export default gql`
  query GetOpportunityTeam($opportunityId: ID!) {
    node(id: $opportunityId) {
      ...OpportunityTeamFragment
    }
  }

  ${OPPORTUNITY_TEAM_FRAGMENT}
`
