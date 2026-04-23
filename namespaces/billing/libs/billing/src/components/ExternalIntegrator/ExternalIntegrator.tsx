import { FC, memo, ReactElement, useEffect } from 'react'

import {
  HandleInboundEvent,
  HandleInboundEventUnsubscribe,
  ModalKey
} from '../../@types/types'
import { ModalData } from '../../store/modalActions'
import { useModals } from '../../_lib/customHooks/useModals'

const displayName = 'ExternalIntegrator'

interface Props {
  children: ReactElement
  handleInboundEvent: HandleInboundEvent
  handleInboundEventUnsubscribe: HandleInboundEventUnsubscribe
}

export const ExternalIntegrator: FC<Props> = memo(
  ({ children, handleInboundEventUnsubscribe, handleInboundEvent }) => {
    const { handleOnOpenModalWithUrlSearch } = useModals()

    useEffect(() => {
      handleInboundEvent('show_modal', {
        showModal: (modalName: string, options?: ModalData) =>
          handleOnOpenModalWithUrlSearch(modalName as ModalKey, options)
      })

      return () => {
        handleInboundEventUnsubscribe('show_modal')
      }
    }, [
      handleInboundEvent,
      handleInboundEventUnsubscribe,
      handleOnOpenModalWithUrlSearch
    ])

    return children
  }
)

ExternalIntegrator.displayName = displayName

export default ExternalIntegrator
