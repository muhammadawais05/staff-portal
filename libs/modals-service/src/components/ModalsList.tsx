import React, { useState, useCallback } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { SHOW_MODAL } from '../messages'
import { ModalInstance, ModalRegistry } from '../types'
import { isLegacyHashModal, isQueryParamsModal } from '../utils'
import { ModalWrapper } from './ModalWrapper'

interface Props {
  registry: ModalRegistry
}

export const ModalsList = ({ registry }: Props) => {
  const [shownModals, setShownModals] = useState<ModalInstance[]>([])

  const hideModal = useCallback((modalToHide: ModalInstance) => {
    setShownModals(modals =>
      modals.filter(modalInstance => modalInstance !== modalToHide)
    )
  }, [])

  const showModal = useCallback((modalToShow: ModalInstance) => {
    setShownModals(modals => [...modals, modalToShow])
  }, [])

  useMessageListener(
    SHOW_MODAL,
    ({
      modal: triggeredModal,
      payload: triggeredPayload,
      modalCallerId: triggeredModalCallerId,
      options: triggeredModalOptions
    }) => {
      let modalInstance = triggeredModalCallerId
        ? shownModals.find(
            ({ modal, modalCallerId }) =>
              modal === triggeredModal &&
              triggeredModalCallerId === modalCallerId
          )
        : shownModals.find(({ modal }) => modal === triggeredModal)

      if (modalInstance) {
        return
      }

      modalInstance = {
        modal: triggeredModal,
        initialPayload: triggeredPayload,
        modalCallerId: triggeredModalCallerId,
        options: triggeredModalOptions ?? {}
      }

      showModal(modalInstance)
    }
  )

  return (
    <>
      {shownModals.map((modalInstance, index) => {
        const options =
          isQueryParamsModal(modalInstance.modal) ||
          isLegacyHashModal(modalInstance.modal)
            ? registry.get(modalInstance.modal)
            : modalInstance.options

        if (!options) {
          return null
        }

        const modalKey = `${modalInstance.modal.name}-${modalInstance.modalCallerId}`

        return (
          <ModalWrapper
            key={modalKey}
            modalInstance={modalInstance}
            hideModal={hideModal}
            isTopModal={index === shownModals.length - 1}
            options={options}
          />
        )
      })}
    </>
  )
}
