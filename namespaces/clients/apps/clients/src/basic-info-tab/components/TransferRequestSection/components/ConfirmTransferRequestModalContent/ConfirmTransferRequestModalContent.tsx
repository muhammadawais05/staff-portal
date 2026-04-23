import React from 'react'
import { RoleV2Scope } from '@staff-portal/graphql/staff'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useGetStaffRoles } from '@staff-portal/staff'

import ConfirmTransferRequestForm from '../ConfirmTransferRequestForm'

type Props = {
  hideModal: () => void
  requestedTransferId: string
  transferRequestid: string
  companyId: string
  scope: RoleV2Scope
}

const ConfirmTransferRequestModalContent = ({
  hideModal,
  requestedTransferId,
  transferRequestid,
  companyId,
  scope
}: Props) => {
  const { options, loading } = useGetStaffRoles(scope)

  if (!options.length) {
    if (loading) {
      return <ModalSuspender />
    }

    return null
  }

  return (
    <ConfirmTransferRequestForm
      hideModal={hideModal}
      requestedTransferId={requestedTransferId}
      transferRequestid={transferRequestid}
      companyId={companyId}
      options={options}
    />
  )
}

export default ConfirmTransferRequestModalContent
