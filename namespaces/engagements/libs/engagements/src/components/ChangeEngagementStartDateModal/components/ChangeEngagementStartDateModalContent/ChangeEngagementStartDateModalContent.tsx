import { ModalSuspender } from '@staff-portal/modals-service'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'

import ChangeEngagementStartDateForm from '../ChangeEngagementStartDateForm'
import { GetChangeEngagementStartDateDataDocument } from './data'

export type Props = {
  engagementId: string
  hideModal: () => void
}

const ChangeEngagementStartDateModalContent = ({
  engagementId,
  hideModal
}: Props) => {
  const { data, loading } = useQuery(GetChangeEngagementStartDateDataDocument, {
    variables: { engagementId }
  })

  if (!data?.node || loading) {
    return <ModalSuspender />
  }

  return (
    <ChangeEngagementStartDateForm
      engagementId={engagementId}
      timeZoneName={data.node.timeZone?.value}
      hideModal={hideModal}
    />
  )
}

export default ChangeEngagementStartDateModalContent
