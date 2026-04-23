import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'

import TalentInfractionRemoveModal from '../components/TalentInfractionRemoveModal'

interface Props {
  infractionId: string
  onRemove: () => void
}

const useTalentInfractionRemoveModal = ({ infractionId, onRemove }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  return {
    showModal,
    renderModal: () =>
      isOpen && (
        <TalentInfractionRemoveModal
          infractionId={infractionId}
          hideModal={hideModal}
          onRemove={onRemove}
        />
      )
  }
}

export default useTalentInfractionRemoveModal
