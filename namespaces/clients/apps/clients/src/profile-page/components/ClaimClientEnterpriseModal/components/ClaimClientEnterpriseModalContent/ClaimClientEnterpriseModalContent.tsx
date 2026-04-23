import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'

import ClaimClientEnterpriseForm from '../ClaimClientEnterpriseForm'
import { useGetClientContacts } from '../../data/get-client-contacts'

export interface Props {
  clientId: string
  hideModal: () => void
}

const ClaimClientEnterpriseModalContent = ({ clientId, hideModal }: Props) => {
  const { loading, data } = useGetClientContacts({ clientId })

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <ClaimClientEnterpriseForm
      data={data}
      hideModal={hideModal}
      clientId={clientId}
    />
  )
}

export default ClaimClientEnterpriseModalContent
