import React from 'react'
import { Modal } from '@staff-portal/modals-service'

import { UnlinkOpportunityContent } from '../UnlinkOpportunityContent'

interface Props {
  opportunityId: string
  representativeId: string
  hideModal: () => void
}

const UnlinkOpportunityModal = ({
  hideModal,
  opportunityId,
  representativeId
}: Props) => {
  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      defaultTitle='Unlink opportunity'
    >
      <UnlinkOpportunityContent
        opportunityId={opportunityId}
        hideModal={hideModal}
        representativeId={representativeId}
      />
    </Modal>
  )
}

export default UnlinkOpportunityModal
