import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { GigReachOutStatus } from '@staff-portal/graphql/staff'

import SendRequestModalForm from '../SendRequestModalForm/SendRequestModalForm'
import { useGetGigReachOutMessageMeta } from '../../../../data/get-gig-reach-out-message-meta'

export interface Props {
  candidateId: string
  gigId: string
  talentName: string
  onSuccessAction: (status: GigReachOutStatus | undefined) => void
  hideModal: () => void
}

const SendRequestModalContent = ({
  candidateId,
  gigId,
  talentName,
  onSuccessAction,
  hideModal
}: Props) => {
  const { gigReachOutMessageMeta, loading: messageMetaLoading } =
    useGetGigReachOutMessageMeta({
      candidateId,
      gigId
    })

  const loading = messageMetaLoading || !gigReachOutMessageMeta

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <SendRequestModalForm
      candidateId={candidateId}
      gigId={gigId}
      talentName={talentName}
      gigReachOutMessageMeta={gigReachOutMessageMeta}
      onSuccessAction={onSuccessAction}
      hideModal={hideModal}
    />
  )
}

export default SendRequestModalContent
