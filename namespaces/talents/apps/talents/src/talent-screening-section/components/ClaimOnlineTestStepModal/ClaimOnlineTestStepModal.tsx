import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { RoleStepNextActionFragment } from '../../data'

const ClaimOnlineTestStepModalContent = lazy(
  () =>
    import(
      './containers/ClaimOnlineTestStepModalContent/ClaimOnlineTestStepModalContent'
    )
)

export interface Props {
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimOnlineTestStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => (
  <Modal onClose={hideModal} open size='small'>
    <ClaimOnlineTestStepModalContent
      roleStepId={roleStepId}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  </Modal>
)

export default ClaimOnlineTestStepModal
