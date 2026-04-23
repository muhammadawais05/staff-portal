import {
  OpportunityOperations,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'

type ValueReturnType = () => {
  callable: OperationCallableTypes
  messages: string[]
}

const opportunityOperations: Record<
  keyof Omit<OpportunityOperations, '_id'>,
  ValueReturnType
> = {
  assignLeastBusyMatcherOpportunity: hiddenOperationMock,
  createGeneralInformationOpportunityNote: hiddenOperationMock,
  deleteOpportunity: hiddenOperationMock,
  linkJobsOpportunity: hiddenOperationMock,
  removeBillingContactOpportunity: hiddenOperationMock,
  removeContractFromOpportunity: hiddenOperationMock,
  updateBillingContactOpportunity: hiddenOperationMock,
  updateBuyerOpportunity: hiddenOperationMock,
  updateContractFromOpportunity: hiddenOperationMock,
  updateOpportunity: hiddenOperationMock,
  updateOpportunityAccountManager: hiddenOperationMock,
  updateOpportunityBillingAddress: hiddenOperationMock,
  updateOpportunityBillingNotes: hiddenOperationMock,
  updateOpportunityClientPartner: hiddenOperationMock,
  updateOpportunityMatcher: hiddenOperationMock,
  updateOpportunityProjectDeliveryManager: hiddenOperationMock,
  updateOpportunityProjectRelationshipManager: hiddenOperationMock,
  updateOpportunityProjectSalesSpecialist: hiddenOperationMock,
  updateOpportunityRelationshipManager: hiddenOperationMock,
  updateOpportunitySalesClaimer: hiddenOperationMock,
  updateOpportunityStatusToClosing: hiddenOperationMock,
  updateOpportunityStatusToIdentified: hiddenOperationMock,
  updateOpportunityStatusToQualifying: hiddenOperationMock,
  updateOpportunityStatusToSolutioning: hiddenOperationMock,
  updateOpportunitySdr: hiddenOperationMock,
  updateProjectOpportunityProjectRelationshipManager: hiddenOperationMock,
  updateProjectOpportunityStatusToIdentified: hiddenOperationMock,
  updateOpportunityStatusToClosedLost: hiddenOperationMock,
  updateOpportunityStatusToClosedWon: hiddenOperationMock,
  updateOpportunityStatusToEnded: hiddenOperationMock,
  updateOpportunityStatusToFulfillment: hiddenOperationMock,
  updateOpportunityStatusToWithdrawn: hiddenOperationMock,
}

type OpportunityOperationsType = typeof opportunityOperations

export type OpportunityOperationType = {
  [key in keyof typeof opportunityOperations]?: ValueReturnType
}

export const opportunityOperationsMock = (
  operation?: Partial<OpportunityOperationsType>
): OpportunityOperationsType => ({
  ...opportunityOperations,
  ...operation
})
