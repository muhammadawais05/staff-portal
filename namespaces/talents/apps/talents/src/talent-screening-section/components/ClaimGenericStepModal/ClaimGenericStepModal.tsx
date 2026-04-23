import React from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import ClaimGenericStepModalContent from './components/ClaimGenericStepModalContent/ClaimGenericStepModalContent'
import { RoleStepNextActionFragment } from '../../data/role-step-next-action-fragment'
import { GetClaimGenericStepDataDocument } from './data/get-claim-generic-step-data/get-claim-generic-step-data.staff.gql.types'
import { getClaimRoleStepMessage } from '../../utils'
import { ClaimGenericMainActions } from './types'

export interface Props {
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimGenericStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, initialLoading } = useQuery(GetClaimGenericStepDataDocument, {
    variables: { roleStepId }
  })

  const stepTitle = data?.node?.step.title
  const talentFullName = data?.node?.talent.fullName || ''
  const talentPartnerFullName = data?.node?.talent.talentPartner?.fullName

  const message =
    stepTitle &&
    getClaimRoleStepMessage({
      talentPartnerFullName,
      stepTitle,
      talentFullName
    })

  if (initialLoading) {
    return (
      <Modal open size='small'>
        <ModalSuspender />
      </Modal>
    )
  }
  if (!data?.node?.mainAction.actionName || !stepTitle) {
    return null
  }

  return (
    <ClaimGenericStepModalContent
      roleStepId={roleStepId}
      talentId={talentId}
      onSuccess={onSuccess}
      hideModal={hideModal}
      stepTitle={stepTitle}
      message={message}
      actionName={data.node.mainAction.actionName as ClaimGenericMainActions}
    />
  )
}

export default ClaimGenericStepModal
