import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useGetNode } from '@staff-portal/data-layer-service'

import SendEngagementPaymentsAgreementModalForm from '../SendEngagementPaymentsAgreementModalForm'
import { GetSendPaymentsAgreementDocument } from '../../data'

type Props = {
  engagementId: string
  hideModal: () => void
}

const SendEngagementPaymentsAgreementModalContent = ({
  engagementId,
  hideModal
}: Props) => {
  const { data, loading } = useGetNode(GetSendPaymentsAgreementDocument)({
    engagementId
  })

  if (loading) {
    return <ModalSuspender />
  }

  const jobTitle = data?.job?.title
  const talentFullName = data?.talent?.fullName
  const clientFullName = data?.client?.fullName

  if (!jobTitle || !talentFullName || !clientFullName) {
    return null
  }

  return (
    <SendEngagementPaymentsAgreementModalForm
      engagementId={engagementId}
      hideModal={hideModal}
      jobTitle={jobTitle}
      talentFullName={talentFullName}
      clientFullName={clientFullName}
    />
  )
}

export default SendEngagementPaymentsAgreementModalContent
