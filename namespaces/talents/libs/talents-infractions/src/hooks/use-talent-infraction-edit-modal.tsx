import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'

import { TalentInfractionFragment } from '../data/talent-infraction-fragment'
import TalentInfractionEditModal from '../components/TalentInfractionEditModal'

const useTalentInfractionEditModal = (infraction: TalentInfractionFragment) => {
  const { showModal, hideModal, isOpen } = useModal()

  return {
    showModal,
    renderModal: () =>
      isOpen && (
        <TalentInfractionEditModal
          infraction={infraction}
          hideModal={hideModal}
        />
      )
  }
}

export default useTalentInfractionEditModal
