import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

import { TITLE } from './constants'

const UpdateSourcingRequestSpecialistModalContent = lazy(
  () =>
    import(
      './components/UpdateSourcingRequestSpecialistModalContent/UpdateSourcingRequestSpecialistModalContent'
    )
)

interface Props {
  jobId: string
  sourcingRequestId: string
  talentSpecialistId?: string | null
  talentSpecialistFullName?: string | null
  hideModal: () => void
}

const UpdateSourcingRequestSpecialistModal = ({
  jobId,
  sourcingRequestId,
  talentSpecialistId,
  talentSpecialistFullName,
  hideModal
}: Props) => (
  <Modal
    open
    onClose={hideModal}
    data-testid='sourcing-request-talent-specialist-modal'
    size='small'
    defaultTitle={TITLE}
    operationVariables={{
      nodeId: sourcingRequestId,
      nodeType: NodeType.SOURCING_REQUEST,
      operationName: 'updateSourcingRequestTalentSpecialist'
    }}
  >
    <UpdateSourcingRequestSpecialistModalContent
      jobId={jobId}
      sourcingRequestId={sourcingRequestId}
      talentSpecialistId={talentSpecialistId}
      talentSpecialistFullName={talentSpecialistFullName}
      hideModal={hideModal}
    />
  </Modal>
)

export default UpdateSourcingRequestSpecialistModal
