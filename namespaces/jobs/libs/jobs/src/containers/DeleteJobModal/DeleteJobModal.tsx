import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Maybe } from '@toptal/picasso/utils'
import { JobStatus } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'

import { DeleteJobModalForm } from './components'

export interface Props {
  jobId: string
  status: Maybe<JobStatus>
  hideModal: () => void
  onSuccess?: () => void
}

const DeleteJobModal = ({ jobId, status, hideModal, onSuccess }: Props) => (
  <Modal
    withForm
    onClose={hideModal}
    operationVariables={{
      nodeId: jobId,
      nodeType: NodeType.JOB,
      operationName: 'removeJob'
    }}
    size='small'
    data-testid='delete-job-modal'
    open
  >
    <Modal.Title>Delete Job</Modal.Title>

    <DeleteJobModalForm
      jobId={jobId}
      status={status}
      hideModal={hideModal}
      onSuccess={onSuccess}
    />
  </Modal>
)

export default DeleteJobModal
