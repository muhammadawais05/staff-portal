import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'

import { LikelihoodToCloseForm } from '../LikelihoodToCloseForm'
import { useGetClientLikelihoodToClose } from '../../../../data/get-client-likelihood-to-close.staff.gql'

export type Props = {
  hideModal: () => void
  clientId: string
}

export const LikelihoodToCloseContent = ({ hideModal, clientId }: Props) => {
  const { data, loading } = useGetClientLikelihoodToClose(clientId)

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <LikelihoodToCloseForm
      likelihoodToClose={data}
      clientId={clientId}
      hideModal={hideModal}
    />
  )
}
