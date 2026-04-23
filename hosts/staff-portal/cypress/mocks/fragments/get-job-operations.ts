import { JobOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getJobOperations = (
  operations?: Partial<JobOperations>
): WithTypename<JobOperations> => ({
  __typename: 'JobOperations',
  _id: '123',
  addJobMatchingNote: hiddenOperationMock(),
  approveJob: hiddenOperationMock(),
  assignNextPurchaseOrder: hiddenOperationMock(),
  assignPurchaseOrder: hiddenOperationMock(),
  assignPurchaseOrderLine: hiddenOperationMock(),
  clearJobFavorites: hiddenOperationMock(),
  cloneJob: hiddenOperationMock(),
  cloneJobForRehire: hiddenOperationMock(),
  createActivity: hiddenOperationMock(),
  createAvailabilityRequestForJob: hiddenOperationMock(),
  createGeneralInformationJobNote: hiddenOperationMock(),
  createJobContactFromJob: hiddenOperationMock(),
  createSourcingRequest: hiddenOperationMock(),
  deleteJob: hiddenOperationMock(),
  editJobInvoiceNote: hiddenOperationMock(),
  linkJobOpportunity: hiddenOperationMock(),
  postponeJob: hiddenOperationMock(),
  refundJobDeposit: hiddenOperationMock(),
  removeJob: hiddenOperationMock(),
  removeJobAvailabilityRequestsRestriction: hiddenOperationMock(),
  removeJobContact: hiddenOperationMock(),
  repostponeJob: hiddenOperationMock(),
  resetJobEstimatedEndDate: hiddenOperationMock(),
  resumePostponedJob: hiddenOperationMock(),
  resumeSendingJobAway: hiddenOperationMock(),
  sendJobAway: hiddenOperationMock(),
  setJobPriority: hiddenOperationMock(),
  unlinkJobOpportunity: hiddenOperationMock(),
  updateAttachTimesheetsToInvoices: hiddenOperationMock(),
  updateJob: hiddenOperationMock(),
  updateJobClaimer: hiddenOperationMock(),
  updateJobEstimatedEndDate: hiddenOperationMock(),
  updateJobEstimatedWeeklyRevenueTalent: hiddenOperationMock(),
  updateJobMatcherQuestions: hiddenOperationMock(),
  updateJobPendingTalentReason: hiddenOperationMock(),
  updateJobPresalesEngagement: hiddenOperationMock(),
  updateJobSalesOwner: hiddenOperationMock(),
  updateJobTalentCount: hiddenOperationMock(),
  ...operations
})
