import { useEffect, useRef, useContext, useCallback, useMemo } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  useHistory,
  useLocation,
  objectToQueryString,
  queryStringToObject,
  DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS
} from '@staff-portal/navigation'

import { ModalContext } from '../contexts/modal-context'
import type { UseModalHook } from '../types'
import { SHOW_MODAL, UPDATE_MODAL, MODAL_CALLER_UNMOUNT } from '../messages'
import { isLegacyHashModal, isQueryParamsModal } from '../utils'
import { useShowLegacyHashModal } from './use-show-legacy-hash-modal'

let MODAL_CALLERS_COUNT = 0

// eslint-disable-next-line max-statements
export const useModal: UseModalHook = (modal, payload?, options?) => {
  // show warning only once
  const warningShown = useRef(false)
  const modalCallerId = useRef(0)
  const emitMessage = useMessageEmitter()
  const { registry } = useContext(ModalContext)

  // generate unique id for each modal caller (the caller of useModal hook)
  if (!modalCallerId.current) {
    MODAL_CALLERS_COUNT++
    modalCallerId.current = MODAL_CALLERS_COUNT
  }

  const location = useLocation()
  const history = useHistory()

  const showModal = useCallback(() => {
    if (payload === null) {
      return
    }

    emitMessage(SHOW_MODAL, {
      modal,
      payload,
      modalCallerId: modalCallerId.current,
      options
    })
  }, [modal, payload, emitMessage, options])

  const showDetachedModal = useCallback(
    modalPayload => {
      emitMessage(SHOW_MODAL, { modal, payload: modalPayload })
    },
    [modal, emitMessage]
  )

  const showModalWithQueryParams = useCallback(() => {
    if (!isQueryParamsModal(modal)) {
      return
    }

    if (payload === null) {
      return
    }

    const modalOptions = registry.get(modal)

    if (!modalOptions) {
      return
    }

    const queryParams = queryStringToObject(location.search)
    let modalQueryParams = { modal: modal.name }

    if ('queryParams' in modalOptions) {
      modalQueryParams = {
        ...modalQueryParams,
        ...modalOptions.queryParams.to(payload)
      }
    }

    showModal()
    history.replace({
      hash: location.hash,
      search: objectToQueryString(
        { ...queryParams, ...modalQueryParams },
        { ...DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS, addQueryPrefix: true }
      )
    })
  }, [modal, payload, history, location, registry, showModal])

  const showLegacyHashModal = useShowLegacyHashModal({
    modal,
    showModal,
    payload
  })

  const queryParams = useMemo(() => {
    if (isQueryParamsModal(modal)) {
      const params = { modal: modal.name }
      const modalOptions = registry.get(modal)

      if (!modalOptions) {
        return {}
      }

      return 'queryParams' in modalOptions
        ? { ...params, ...modalOptions.queryParams.to(payload) }
        : params
    }
  }, [modal, payload, registry])

  useEffect(() => {
    if (payload === null) {
      return
    }

    emitMessage(UPDATE_MODAL, {
      modal,
      payload,
      modalCallerId: modalCallerId.current
    })
  }, [emitMessage, modal, payload])

  useEffect(
    () => () =>
      emitMessage(MODAL_CALLER_UNMOUNT, {
        modal,
        modalCallerId: modalCallerId.current
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  if (
    (isQueryParamsModal(modal) || isLegacyHashModal(modal)) &&
    !registry.get(modal) &&
    !warningShown.current
  ) {
    warningShown.current = true
    // eslint-disable-next-line no-console
    console.warn(
      `Modal "${modal.name}" is not registered, please register it with ModalRegistry first.`
    )
  }

  const result = isLegacyHashModal(modal)
    ? { showLegacyHashModal }
    : isQueryParamsModal(modal)
    ? { showModal, showDetachedModal, showModalWithQueryParams, queryParams }
    : { showModal, showDetachedModal }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any
}
