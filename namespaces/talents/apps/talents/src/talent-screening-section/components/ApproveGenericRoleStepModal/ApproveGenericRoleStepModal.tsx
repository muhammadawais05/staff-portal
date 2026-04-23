import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { RoleStepNextActionFragment } from '../../data'

const ApproveGenericRoleStepModalContent = lazy(
  () =>
    import(
      './containers/ApproveGenericRoleStepModalContent/ApproveGenericRoleStepModalContent'
    )
)

export interface Props {
  roleStepId: string
  onSuccess: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveGenericRoleStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => (
  <Modal onClose={hideModal} open size='small'>
    <ApproveGenericRoleStepModalContent
      roleStepId={roleStepId}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  </Modal>
)

export default ApproveGenericRoleStepModal
