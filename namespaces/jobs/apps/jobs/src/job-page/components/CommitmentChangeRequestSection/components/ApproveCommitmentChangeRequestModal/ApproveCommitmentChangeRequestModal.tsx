import React from 'react'
import { ContainerLoader, ModalSkeleton } from '@staff-portal/ui'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { useGetAproveCommitmentChangeRequestData } from './data'
import ApproveCommitmentChangeRequestForm, {
  MODAL_TITLE
} from '../ApproveCommitmentChangeRequestForm'

type Props = {
  jobId: string
  commitmentChangeRequestId: string
  hideModal: () => void
}

const ApproveCommitmentChangeRequestModal = ({
  jobId,
  commitmentChangeRequestId,
  hideModal
}: Props) => {
  const {
    data: job,
    loading,
    initialLoading
  } = useGetAproveCommitmentChangeRequestData(jobId)

  return (
    <Modal
      open
      withForm
      data-testid='ApproveCommitmentChangeRequestModal'
      onClose={hideModal}
      operationVariables={{
        nodeId: commitmentChangeRequestId,
        nodeType: NodeType.COMMITMENT_CHANGE_REQUEST,
        operationName: 'approveCommitmentChangeRequest'
      }}
    >
      <ContainerLoader
        isModalContainer
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={MODAL_TITLE} />}
      >
        {job?.pendingCommitmentChangeRequest && (
          <ApproveCommitmentChangeRequestForm
            hideModal={hideModal}
            jobId={job.id}
            jobTitle={job.title}
            commitmentChangeRequest={job.pendingCommitmentChangeRequest}
          />
        )}
      </ContainerLoader>
    </Modal>
  )
}

export default ApproveCommitmentChangeRequestModal
