import { OpportunityOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getOpportunityOperations = (
  operations?: Partial<OpportunityOperations>
): WithTypename<OpportunityOperations> => ({
  _id: '123',
  __typename: 'OpportunityOperations',
  assignLeastBusyMatcherOpportunity: hiddenOperationMock(),
  createGeneralInformationOpportunityNote: hiddenOperationMock(),
  deleteOpportunity: hiddenOperationMock(),
  linkJobsOpportunity: hiddenOperationMock(),
  removeBillingContactOpportunity: hiddenOperationMock(),
  removeContractFromOpportunity: hiddenOperationMock(),
  updateBillingContactOpportunity: hiddenOperationMock(),
  updateBuyerOpportunity: hiddenOperationMock(),
  updateContractFromOpportunity: hiddenOperationMock(),
  updateOpportunity: hiddenOperationMock(),
  updateOpportunityAccountManager: hiddenOperationMock(),
  updateOpportunityBillingAddress: hiddenOperationMock(),
  updateOpportunityBillingNotes: hiddenOperationMock(),
  updateOpportunityClientPartner: hiddenOperationMock(),
  updateOpportunityMatcher: hiddenOperationMock(),
  updateOpportunityProjectDeliveryManager: hiddenOperationMock(),
  updateOpportunityProjectRelationshipManager: hiddenOperationMock(),
  updateOpportunityProjectSalesSpecialist: hiddenOperationMock(),
  updateOpportunityRelationshipManager: hiddenOperationMock(),
  updateOpportunitySalesClaimer: hiddenOperationMock(),
  updateOpportunityStatusToClosing: hiddenOperationMock(),
  updateOpportunityStatusToIdentified: hiddenOperationMock(),
  updateOpportunityStatusToQualifying: hiddenOperationMock(),
  updateOpportunityStatusToSolutioning: hiddenOperationMock(),
  updateOpportunitySdr: hiddenOperationMock(),
  updateProjectOpportunityProjectRelationshipManager: hiddenOperationMock(),
  updateProjectOpportunityStatusToIdentified: hiddenOperationMock(),
  updateOpportunityStatusToClosedLost: hiddenOperationMock(),
  updateOpportunityStatusToClosedWon: hiddenOperationMock(),
  updateOpportunityStatusToEnded: hiddenOperationMock(),
  updateOpportunityStatusToFulfillment: hiddenOperationMock(),
  updateOpportunityStatusToWithdrawn: hiddenOperationMock(),
  ...operations
})
