import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'

import DeleteOpportunityModal from '../DeleteOpportunityModal'

const useDeleteOpportunityModal = ({
  opportunityId
}: {
  opportunityId: string
}) => {
  const { showModal, hideModal, isOpen } = useModal()

  return {
    showModal,
    renderModal: () =>
      isOpen && (
        <DeleteOpportunityModal
          opportunityId={opportunityId}
          onClose={hideModal}
        />
      )
  }
}

export default useDeleteOpportunityModal
