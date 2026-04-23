import React from 'react'
import { Container } from '@toptal/picasso'
import { ActionLoader } from '@staff-portal/ui'

import ConfirmTransferRequestButton from '../ConfirmTransferRequestButton'
import RejectTransferRequestButton from '../RejectTransferRequestButton'
import { ClientTransferRoleRequestFragment } from '../../data'
import { getScopeByRelationship } from '../../utils'

type Props = {
  isLoading?: boolean
  transferRequest?: ClientTransferRoleRequestFragment
  companyId?: string
}

const TransferRequestActions = ({
  isLoading,
  transferRequest,
  companyId
}: Props) => {
  const { id, requestedTransfer, relationship, operations } =
    transferRequest || {}
  const requestedTransferId = requestedTransfer?.id

  if (
    isLoading ||
    !id ||
    !requestedTransferId ||
    !relationship ||
    !companyId ||
    !operations
  ) {
    return (
      <Container flex left='small'>
        <ActionLoader />
        <ActionLoader />
      </Container>
    )
  }

  const scope = getScopeByRelationship(relationship)

  return (
    <Container flex left='small'>
      <ConfirmTransferRequestButton
        transferRequestid={id}
        companyId={companyId}
        requestedTransferId={requestedTransferId}
        operation={operations.confirmClientTransferRoleRequest}
        scope={scope}
      />
      <RejectTransferRequestButton
        transferRequestId={id}
        companyId={companyId}
        operation={operations.rejectClientTransferRoleRequest}
      />
    </Container>
  )
}

export default TransferRequestActions
