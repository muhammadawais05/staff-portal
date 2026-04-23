import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import { RoleStepNextActionFragment } from '../../../../data'
import { GetApproveGenericRoleStepDataDocument } from '../../data/get-approve-generic-role-step-data/get-approve-generic-role-step-data.staff.gql.types'
import ApproveGenericRoleStepModalForm from '../ApproveGenericRoleStepModalForm/ApproveGenericRoleStepModalForm'
import { ApproveGenericMainActions } from '../../types'

export interface Props {
  roleStepId: string
  onSuccess: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveGenericRoleStepModalContent = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading } = useQuery(GetApproveGenericRoleStepDataDocument, {
    variables: { roleStepId }
  })

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node?.mainAction?.actionName) {
    return null
  }

  return (
    <ApproveGenericRoleStepModalForm
      actionName={data.node.mainAction.actionName as ApproveGenericMainActions}
      roleStep={data.node}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  )
}

export default ApproveGenericRoleStepModalContent
