import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useGetNode } from '@staff-portal/data-layer-service'
import React from 'react'

import { RoleStepNextActionFragment } from '../../data/role-step-next-action-fragment'
import { GetClaimTechnicalGenericStepDataDocument } from './data'
import { useGetStepClaimers } from '../StepClaimerSelect/data'
import ClaimTechnicalGenericStepModalContent from './components/ClaimTechnicalGenericStepModalContent'
interface Props {
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimTechnicalGenericStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading: dataLoading } = useGetNode(
    GetClaimTechnicalGenericStepDataDocument
  )({
    roleStepId
  })

  const { claimers, loading: claimersLoading } = useGetStepClaimers(roleStepId)

  const isLoading = dataLoading || claimersLoading

  return (
    <Modal withForm onClose={hideModal} open size='small'>
      {isLoading && <ModalSuspender />}
      {!isLoading && data && (
        <ClaimTechnicalGenericStepModalContent
          stepData={data}
          claimers={claimers}
          onSuccess={onSuccess}
          hideModal={hideModal}
          talentId={talentId}
        />
      )}
    </Modal>
  )
}

export default ClaimTechnicalGenericStepModal
