import { useMemo } from 'react'
import { JobStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'
import { OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import {
  DeleteJobModal,
  RestorePostponedModal,
  PostponeJobModal,
  SendJobAwayModal,
  RestoreSendingAwayModal
} from '@staff-portal/jobs'

import { useCloneJobModal } from '../../CloneJobModal/hooks'
import LinkJobOpportunityModal from '../../LinkJobOpportunityModal'
import CloneJobForRehireModal from '../../CloneJobForRehireModal'
import RemoveJobAvailabilityRequestsRestrictionModal from '../../RemoveJobAvailabilityRequestsRestrictionModal'
import RefundDepositModal from '../../RefundDepositModal'
import { RequestAvailabilityModal } from '../..'

interface Props {
  jobId: string
  jobStatus: Maybe<JobStatus>
  clientFullName: string
  jobType: string
  jobTitle: string
  operations?: Maybe<{
    removeJob: OperationType
    resumePostponedJob: OperationType
    updateJob: OperationType
    linkJobOpportunity: OperationType
    cloneJob: OperationType
    cloneJobForRehire: OperationType
    createSourcingRequest: OperationType
    removeJobAvailabilityRequestsRestriction: OperationType
    resumeSendingJobAway: OperationType
    postponeJob: OperationType
    repostponeJob: OperationType
    refundJobDeposit: OperationType
    sendJobAway: OperationType
    createAvailabilityRequestForJob: OperationType
  }>
  sendEmailToClientOperation?: OperationType
}

export const useJobMoreActions = ({
  jobId,
  jobStatus,
  clientFullName,
  jobType,
  jobTitle,
  operations,
  sendEmailToClientOperation
}: Props) => {
  const {
    removeJob: removeJobOperation,
    resumePostponedJob: resumePostponedJobOperation,
    updateJob: updateJobOperation,
    linkJobOpportunity: linkJobOpportunityOperation,
    cloneJob: cloneJobOperation,
    cloneJobForRehire: cloneJobForRehireOperation,
    createSourcingRequest: addSourcingRequestOperation,
    removeJobAvailabilityRequestsRestriction:
      removeJobAvailabilityRequestsRestrictionOperation,
    resumeSendingJobAway: resumeSendingJobAwayOperation,
    postponeJob: postponeJobOperation,
    repostponeJob: repostponeJobOperation,
    refundJobDeposit: refundJobDepositOperation,
    sendJobAway: sendJobAwayOperation,
    createAvailabilityRequestForJob: createAvailabilityRequestForJobOperation
  } = operations || {}

  const { showModal: showDeleteJobModal } = useModal(DeleteJobModal, {
    jobId,
    status: jobStatus
  })

  const { showModal: showRestorePostponeModal } = useModal(
    RestorePostponedModal,
    {
      jobId
    }
  )

  const { showModal: showLinkJobOportunityModal } = useModal(
    LinkJobOpportunityModal,
    {
      jobId
    }
  )

  const { showModal: showCloneJobModal } = useCloneJobModal({
    jobId
  })

  const { showModal: showJobForRehireModal } = useModal(
    CloneJobForRehireModal,
    { jobId }
  )

  const { showModal: showRemoveJobAvailabilityRequestsRestrictionModal } =
    useModal(RemoveJobAvailabilityRequestsRestrictionModal, { jobId })

  const { showModal: showPostponeJobModal } = useModal(PostponeJobModal, {
    jobId,
    jobStatus
  })

  const { showModal: showRestoreSendingAwayModal } = useModal(
    RestoreSendingAwayModal,
    { jobId }
  )

  const { showModal: showRefundDepositModal } = useModal(RefundDepositModal, {
    jobId
  })

  const { showModal: showSendJobAwayModal } = useModal(SendJobAwayModal, {
    jobId
  })

  const { showModal: showRequestAvailabilityModal } = useModal(
    RequestAvailabilityModal,
    {
      jobId,
      jobTitle,
      clientFullName,
      jobType
    }
  )

  const allOperationsHidden = useMemo(() => {
    if (!jobStatus) {
      return
    }

    const shouldShowEditButton =
      [
        JobStatus.POSTPONED,
        JobStatus.PENDING_CLAIM,
        JobStatus.PENDING_ENGINEER,
        JobStatus.ACTIVE
      ].includes(jobStatus) &&
      updateJobOperation?.callable !== OperationCallableTypes.HIDDEN

    return (
      !shouldShowEditButton &&
      [
        addSourcingRequestOperation,
        cloneJobForRehireOperation,
        cloneJobOperation,
        createAvailabilityRequestForJobOperation,
        linkJobOpportunityOperation,
        postponeJobOperation,
        refundJobDepositOperation,
        removeJobAvailabilityRequestsRestrictionOperation,
        removeJobOperation,
        repostponeJobOperation,
        resumePostponedJobOperation,
        resumeSendingJobAwayOperation,
        sendJobAwayOperation,
        updateJobOperation,
        sendEmailToClientOperation
      ].every(
        operation =>
          !operation || operation.callable === OperationCallableTypes.HIDDEN
      )
    )
  }, [
    jobStatus,
    addSourcingRequestOperation,
    cloneJobForRehireOperation,
    cloneJobOperation,
    createAvailabilityRequestForJobOperation,
    linkJobOpportunityOperation,
    postponeJobOperation,
    refundJobDepositOperation,
    removeJobAvailabilityRequestsRestrictionOperation,
    removeJobOperation,
    repostponeJobOperation,
    resumePostponedJobOperation,
    resumeSendingJobAwayOperation,
    sendJobAwayOperation,
    updateJobOperation,
    sendEmailToClientOperation
  ])

  return {
    showDeleteJobModal,
    showRestorePostponeModal,
    showLinkJobOportunityModal,
    showCloneJobModal,
    showJobForRehireModal,
    showRemoveJobAvailabilityRequestsRestrictionModal,
    showPostponeJobModal,
    showRestoreSendingAwayModal,
    showRefundDepositModal,
    showSendJobAwayModal,
    showRequestAvailabilityModal,
    allOperationsHidden
  }
}
