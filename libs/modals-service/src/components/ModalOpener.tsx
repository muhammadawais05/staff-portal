import { useEffect, useMemo } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@toptal/picasso/utils'
import { useLocation, queryStringToObject } from '@staff-portal/navigation'

import { ModalRegistry } from '../types'
import { SHOW_MODAL } from '../messages'
import { isLegacyHashModal, isQueryParamsModal } from '../utils'

interface Props {
  registry: ModalRegistry
}

export const ModalOpener = ({ registry }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const location = useLocation()
  const queryParams = useMemo(
    () => queryStringToObject(location.search),
    [location]
  )
  const registeredModals = registry.keys()

  const modalToOpen = useMemo(() => {
    const { modal } = queryParams

    if (modal && typeof modal === 'string') {
      return registeredModals.find(registered => registered.name === modal)
    }

    if (location.hash.includes('#modal')) {
      return registeredModals.find(
        registered =>
          isLegacyHashModal(registered) &&
          registry.get(registered)?.pattern.test(location.hash)
      )
    }
  }, [registry, registeredModals, queryParams, location.hash])

  useEffect(() => {
    if (modalToOpen) {
      const modalOptions = registry.get(modalToOpen)

      if (!modalOptions) {
        return
      }

      const showWarning = (message?: string): false => {
        showError(
          message ??
            `Cannot open "${modalToOpen.name}" modal, some required params are missing.`
        )

        return false
      }

      if (isQueryParamsModal(modalToOpen)) {
        const payload =
          'queryParams' in modalOptions
            ? modalOptions.queryParams.from(queryParams, { showWarning })
            : undefined

        if (payload !== false) {
          emitMessage(SHOW_MODAL, { modal: modalToOpen, payload })
        }
      } else if (isLegacyHashModal(modalToOpen)) {
        const options = registry.get(modalToOpen)

        const payload = options?.mapHashToPayload(
          options?.pattern.exec(location.hash)?.groups ?? {},
          { showWarning }
        )

        if (payload !== false) {
          emitMessage(SHOW_MODAL, { modal: modalToOpen, payload })
        }
      }
    }
  }, [
    emitMessage,
    modalToOpen,
    queryParams,
    registry,
    showError,
    location.hash
  ])

  return null
}
