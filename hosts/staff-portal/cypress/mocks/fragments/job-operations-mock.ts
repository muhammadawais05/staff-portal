import { JobOperations } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'
import { enabledOperationMock } from '../enabled-operation-mock'

export const jobOperationsMock = (operations?: Partial<JobOperations>) =>
  ({
    __typename: 'JobOperations',
    addJobMatchingNote: hiddenOperationMock(),
    approveJob: hiddenOperationMock(),
    clearJobFavorites: hiddenOperationMock(),
    createActivity: hiddenOperationMock(),
    createGeneralInformationJobNote: hiddenOperationMock(),
    createSourcingRequest: hiddenOperationMock(),
    deleteJob: hiddenOperationMock(),
    editJobInvoiceNote: hiddenOperationMock(),
    refundJobDeposit: hiddenOperationMock(),
    removeJob: hiddenOperationMock(),
    resumePostponedJob: hiddenOperationMock(),
    updateJob: hiddenOperationMock(),
    assignNextPurchaseOrder: hiddenOperationMock(),
    assignPurchaseOrder: hiddenOperationMock(),
    updateAttachTimesheetsToInvoices: hiddenOperationMock(),
    updateJobMatcherQuestions: hiddenOperationMock(),
    updateJobEstimatedEndDate: hiddenOperationMock(),
    updateJobSalesOwner: hiddenOperationMock(),
    setJobPriority: hiddenOperationMock(),
    updateJobTalentCount: hiddenOperationMock(),
    linkJobOpportunity: hiddenOperationMock(),
    unlinkJobOpportunity: hiddenOperationMock(),
    updateJobPresalesEngagement: hiddenOperationMock(),
    updateJobPendingTalentReason: hiddenOperationMock(),
    updateJobClaimer: hiddenOperationMock(),
    removeJobContact: hiddenOperationMock(),
    createJobContactFromJob: hiddenOperationMock(),
    updateJobEstimatedWeeklyRevenueTalent: hiddenOperationMock(),
    cloneJob: enabledOperationMock(),
    cloneJobForRehire: enabledOperationMock(),
    removeJobAvailabilityRequestsRestriction: hiddenOperationMock(),
    resumeSendingJobAway: hiddenOperationMock(),
    postponeJob: hiddenOperationMock(),
    repostponeJob: hiddenOperationMock(),
    ...operations
  } as JobOperations)
