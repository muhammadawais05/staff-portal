import React from 'react'
import { Maybe } from '@toptal/picasso/utils'
import { Modal } from '@staff-portal/modals-service'

import Content from './components/TerminateEngagementModalContent/TerminateEngagementModalContent'
import { getTerminateEngagementTitle } from '../../services'

export interface Props {
  engagementId: string
  talentCount?: Maybe<number>
  endDate?: Date
  hideModal: () => void
}

const TerminateEngagementModal = ({
  engagementId,
  talentCount,
  endDate,
  hideModal
}: Props) => {
  const title = getTerminateEngagementTitle(talentCount)

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      defaultTitle={title}
      data-testid='terminate-engagement-modal'
    >
      <Content
        title={title}
        engagementId={engagementId}
        endDate={endDate}
        onClose={hideModal}
      />
    </Modal>
  )
}

export default TerminateEngagementModal
