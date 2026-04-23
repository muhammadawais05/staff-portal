import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import { RoleStepNextActionFragment } from '../../../../data'
import ApproveOnlineTestStepModalForm from '../ApproveOnlineTestStepModalForm/ApproveOnlineTestStepModalForm'
import { GetApproveOnlineTestDataDocument } from '../../data/get-approve-online-test-data/get-approve-online-test-data.staff.gql.types'

export interface Props {
  roleStepId: string
  onSuccess?: (nextAction: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveOnlineTestStepModalContent = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading } = useQuery(GetApproveOnlineTestDataDocument, {
    variables: { roleStepId }
  })

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node) {
    return null
  }

  return (
    <ApproveOnlineTestStepModalForm
      roleStep={data.node}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  )
}

export default ApproveOnlineTestStepModalContent
