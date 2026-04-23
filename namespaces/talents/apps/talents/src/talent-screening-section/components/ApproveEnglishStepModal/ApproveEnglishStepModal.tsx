import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { RoleStepNextActionFragment } from '../../data/role-step-next-action-fragment'

const ApproveEnglishStepModalContent = lazy(
  () =>
    import(
      './containers/ApproveEnglishStepModalContent/ApproveEnglishStepModalContent'
    )
)

export interface Props {
  roleStepId: string
  onSuccess?: (nextAction: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveEnglishStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  return (
    <Modal onClose={hideModal} open size='small'>
      <ApproveEnglishStepModalContent
        roleStepId={roleStepId}
        onSuccess={onSuccess}
        hideModal={hideModal}
        talentId={talentId}
      />
    </Modal>
  )
}

export default ApproveEnglishStepModal
