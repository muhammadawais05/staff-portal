import { ModalSuspender } from '@staff-portal/modals-service'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'

import ChangeEngagementEndDateForm from '../ChangeEngagementEndDateForm'
import { GetChangeEngagementEndDateDataDocument } from './data'

type Props = {
  engagementId: string
  hideModal: () => void
}

const ChangeEngagementEndDateModalContent = ({
  engagementId,
  hideModal
}: Props) => {
  const { data, loading } = useQuery(GetChangeEngagementEndDateDataDocument, {
    variables: { engagementId }
  })

  if (!data?.node || loading) {
    return <ModalSuspender />
  }

  return (
    <ChangeEngagementEndDateForm
      engagementId={engagementId}
      endDate={data.node.endDate}
      hideModal={hideModal}
    />
  )
}

export default ChangeEngagementEndDateModalContent
