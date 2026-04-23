import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { SourcingRequestStatus } from '@staff-portal/graphql/staff'

import { UpdateSourcingRequestStatusForm } from './components'
import { TITLE } from './constants'

interface Props {
  jobId: string
  sourcingRequestId?: string
  sourcingRequestStatus?: SourcingRequestStatus | null
  hideModal: () => void
}

const UpdateSourcingRequestSpecialistModal = ({
  jobId,
  sourcingRequestId,
  sourcingRequestStatus,
  hideModal
}: Props) => (
  <Modal
    open
    onClose={hideModal}
    data-testid='sourcing-request-status-modal'
    size='small'
    defaultTitle={TITLE}
    operationVariables={{
      nodeId: sourcingRequestId || '',
      nodeType: NodeType.SOURCING_REQUEST,
      operationName: 'updateSourcingRequestStatus'
    }}
  >
    <UpdateSourcingRequestStatusForm
      jobId={jobId}
      sourcingRequestId={sourcingRequestId}
      sourcingRequestStatus={sourcingRequestStatus}
      hideModal={hideModal}
    />
  </Modal>
)

export default UpdateSourcingRequestSpecialistModal
