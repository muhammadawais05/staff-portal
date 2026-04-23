import React, { memo, FC, useState, useCallback } from 'react'
import {
  useMessageListener,
  useImmediateMessageListener
} from '@toptal/staff-portal-message-bus'
import {
  useHistory,
  useLocation,
  objectToQueryString,
  queryStringToObject,
  DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS
} from '@staff-portal/navigation'
import { extractModalHash } from '@staff-portal/utils'

import { UPDATE_MODAL, MODAL_CALLER_UNMOUNT } from '../messages'
import {
  TypedModal,
  TypedModalWithQueryParams,
  ModalInstance,
  ModalOptions,
  UrlModal
} from '../types'
import { isLegacyHashModal, isQueryParamsModal } from '../utils'

interface Props {
  hideModal: (modal: ModalInstance) => void
  isTopModal: boolean
  modalInstance: ModalInstance
  options: ModalOptions<TypedModal>
}

export const ModalWrapper: FC<Props> = memo(
  ({ modalInstance, isTopModal, hideModal: hideModalInstance, options }) => {
    const { modal, initialPayload, modalCallerId } = modalInstance
    const [payload, setPayload] = useState(initialPayload)

    const location = useLocation()
    const history = useHistory()
    const hideModal = useCallback(
      () => hideModalInstance(modalInstance),
      [hideModalInstance, modalInstance]
    )

    const resetQueryParams = useCallback(() => {
      if (isQueryParamsModal(modal)) {
        const queryParams = queryStringToObject(location.search)
        const modalOptions = options as ModalOptions<TypedModalWithQueryParams>

        const modalQueryParams =
          'queryParams' in modalOptions
            ? modalOptions.queryParams.to(payload)
            : {}

        delete queryParams.modal
        Object.keys(modalQueryParams).forEach(key => {
          delete queryParams[key]
        })

        history.replace({
          hash: location.hash,
          search: objectToQueryString(queryParams, {
            ...DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS,
            addQueryPrefix: true
          })
        })

        return
      }

      if (isLegacyHashModal(modal)) {
        const modalHash = extractModalHash(location.hash)

        if (modalHash) {
          history.replace({
            hash: location.hash.replace(modalHash, ''),
            search: location.search
          })
        }
      }
    }, [location, history, modal, options, payload])

    const hideWithNavigationReset = useCallback(() => {
      resetQueryParams()
      hideModal()
    }, [resetQueryParams, hideModal])

    useImmediateMessageListener(
      UPDATE_MODAL,
      ({
        modal: updatedModal,
        payload: updatedPayload,
        modalCallerId: updatedModalCallerId
      }) => {
        if (!modalCallerId) {
          return
        }

        if (updatedModal === modal && updatedModalCallerId === modalCallerId) {
          setPayload(updatedPayload)
        }
      }
    )

    useMessageListener(
      MODAL_CALLER_UNMOUNT,
      ({ modal: modalToHide, modalCallerId: unmountedModalCallerId }) => {
        if (!modalCallerId || options?.leaveOnCallerUnmount) {
          return
        }

        if (modalToHide === modal && unmountedModalCallerId === modalCallerId) {
          hideModal()
        }
      }
    )

    const ModalComponent =
      isQueryParamsModal(modal) || isLegacyHashModal(modal)
        ? (options as ModalOptions<UrlModal>).Component
        : modal

    return (
      <ModalComponent
        hideModal={hideWithNavigationReset}
        isTopModal={isTopModal}
        {...payload}
      />
    )
  }
)
