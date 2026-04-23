import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'

import BlackFlagModalForm from '../BlackFlagModalForm'
import { useGetDepositRefundAllowed } from './data'

interface Props {
  clientId: string
  clientName: string
  hideModal: () => void
}

const BlackFlagModalContent = ({ clientId, clientName, hideModal }: Props) => {
  // The deposit refund allowed field is not optimized (N+1).
  // Use when necessary. Try to avoid call within connection
  const { isDepositRefundAllowed, loading } =
    useGetDepositRefundAllowed(clientId)

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <BlackFlagModalForm
      clientId={clientId}
      clientName={clientName}
      isDepositRefundAllowed={isDepositRefundAllowed}
      hideModal={hideModal}
    />
  )
}

export default BlackFlagModalContent
