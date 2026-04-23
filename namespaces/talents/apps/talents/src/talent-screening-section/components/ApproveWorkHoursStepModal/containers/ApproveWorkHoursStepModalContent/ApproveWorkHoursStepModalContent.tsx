import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import ApproveWorkHoursStepModalForm from '../ApproveWorkHoursStepModalForm/ApproveWorkHoursStepModalForm'
import { Props } from '../../ApproveWorkHoursStepModal'
import { GetApproveWorkHoursDataDocument } from './data/get-approve-work-hours-data/get-approve-work-hours-data.staff.gql.types'

const ApproveWorkHoursStepModalContent = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading } = useQuery(GetApproveWorkHoursDataDocument, {
    variables: { roleStepId }
  })

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node) {
    return null
  }

  return (
    <ApproveWorkHoursStepModalForm
      roleStep={data.node}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  )
}

export default ApproveWorkHoursStepModalContent
