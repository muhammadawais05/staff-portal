import React from 'react'
import { lazy } from '@staff-portal/utils'
import { Modal } from '@staff-portal/modals-service'

import { RoleStepNextActionFragment } from '../../data/role-step-next-action-fragment'

const ApproveWorkHoursStepModalContent = lazy(
  () =>
    import(
      './containers/ApproveWorkHoursStepModalContent/ApproveWorkHoursStepModalContent'
    )
)

export interface Props {
  roleStepId: string
  onSuccess: (nextAction: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveWorkHoursStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => (
  <Modal withForm onClose={hideModal} open size='small'>
    <ApproveWorkHoursStepModalContent
      roleStepId={roleStepId}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  </Modal>
)

export default ApproveWorkHoursStepModal
