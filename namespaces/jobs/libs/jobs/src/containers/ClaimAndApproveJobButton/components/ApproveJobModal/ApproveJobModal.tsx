import React, { useMemo } from 'react'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

export interface Props {
  jobId: string
  hideModal: () => void
  onApproveJob: () => void
}

const ApproveJobModalContent = lazy(() => import('../ApproveJobModalContent'))

const ApproveJobModal = ({ jobId, onApproveJob, hideModal }: Props) => {
  const operationVariables = useMemo<GetLazyOperationVariables>(
    () => ({
      nodeId: jobId,
      nodeType: NodeType.JOB,
      operationName: 'approveJob'
    }),
    [jobId]
  )

  return (
    <Modal
      onClose={hideModal}
      operationVariables={operationVariables}
      defaultTitle='Claim Job'
      open
      size='medium'
      data-testid='approve-job-modal'
    >
      <ApproveJobModalContent
        jobId={jobId}
        onApproveJob={onApproveJob}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default ApproveJobModal
