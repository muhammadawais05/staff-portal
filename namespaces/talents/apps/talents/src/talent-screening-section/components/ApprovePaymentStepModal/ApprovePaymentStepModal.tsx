import React from 'react'
import { Modal } from '@staff-portal/modals-service'

import { RoleStepNextActionFragment } from '../../data/role-step-next-action-fragment'
import ApprovePaymentStepModalContent from './containers/ApprovePaymentStepModalContent/ApprovePaymentStepModalContent'

export interface Props {
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApprovePaymentStepModal = ({
  roleStepId,
  hideModal,
  onSuccess,
  talentId
}: Props) => (
  <Modal withForm onClose={hideModal} open size='small'>
    <ApprovePaymentStepModalContent
      roleStepId={roleStepId}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  </Modal>
)

export default ApprovePaymentStepModal
