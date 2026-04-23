import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import ApprovePaymentStepModalForm from '../ApprovePaymentStepModalForm/ApprovePaymentStepModalForm'
import { Props } from '../../ApprovePaymentStepModal'
import { GetApprovePaymentDataDocument } from './data/get-approve-payment-data/get-approve-payment-data.staff.gql.types'

const ApproveWorkHoursStepModalContent = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading } = useQuery(GetApprovePaymentDataDocument, {
    variables: { roleStepId }
  })

  if (loading) {
    return <ModalSuspender />
  }

  if (!data?.node) {
    return null
  }

  return (
    <ApprovePaymentStepModalForm
      roleStepId={roleStepId}
      claimer={data.node.claimer}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  )
}

export default ApproveWorkHoursStepModalContent
