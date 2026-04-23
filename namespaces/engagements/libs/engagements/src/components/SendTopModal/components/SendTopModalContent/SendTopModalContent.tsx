import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import { GetSendTopModalDataDocument } from '../../data/get-send-top-modal-data/get-send-top-modal-data.staff.gql.types'
import SendTopForm from '../SendTopForm'

export type Props = {
  engagementId: string
  hideModal: () => void
}

const SendTopModalContent = ({
  engagementId,
  hideModal,
  ...restProps
}: Props) => {
  const { data, loading } = useQuery(GetSendTopModalDataDocument, {
    variables: { engagementId }
  })

  if (!data?.node || loading) {
    return <ModalSuspender />
  }

  return (
    <SendTopForm hideModal={hideModal} engagement={data.node} {...restProps} />
  )
}

export default SendTopModalContent
