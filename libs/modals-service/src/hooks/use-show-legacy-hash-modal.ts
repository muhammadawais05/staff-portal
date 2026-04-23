import { useCallback, useContext } from 'react'
import { useHistory, useLocation } from '@staff-portal/navigation'
import { extractModalHash } from '@staff-portal/utils'

import type { PayloadOf, TypedModal } from '../types'
import { isLegacyHashModal } from '../utils'
import { ModalContext } from '../contexts/modal-context'

export const useShowLegacyHashModal = <M extends TypedModal>({
  modal,
  showModal,
  payload
}: {
  modal: M
  showModal: () => void
  payload?: PayloadOf<M> | null
}) => {
  const { registry } = useContext(ModalContext)
  const history = useHistory()
  const location = useLocation()

  return useCallback(() => {
    if (!isLegacyHashModal(modal)) {
      return
    }

    const modalOptions = registry.get(modal)

    if (modalOptions) {
      showModal()

      const openedModalHash = extractModalHash(location.hash)
      const newModalHash = modalOptions.mapPayloadToHash(payload)

      history.replace({
        hash: openedModalHash
          ? location.hash.replace(openedModalHash, newModalHash)
          : location.hash + newModalHash,
        search: location.search
      })
    }
  }, [history, location, registry, modal, showModal, payload])
}
