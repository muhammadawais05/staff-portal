import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import { GetApproveEnglishDataDocument } from '../../data/get-approve-english-data/get-approve-english-data.staff.gql.types'
import { RoleStepNextActionFragment } from '../../../../data'
import ApproveEnglishStepModalForm from '../ApproveEnglishStepModalForm/ApproveEnglishStepModalForm'

export interface Props {
  roleStepId: string
  onSuccess?: (nextAction: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveEnglishStepModalContent = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading } = useQuery(GetApproveEnglishDataDocument, {
    variables: { roleStepId }
  })

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node) {
    return null
  }

  return (
    <ApproveEnglishStepModalForm
      roleStep={data.node}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  )
}

export default ApproveEnglishStepModalContent
