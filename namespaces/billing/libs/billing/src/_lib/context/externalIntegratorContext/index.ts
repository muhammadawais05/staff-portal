import { createContext, useContext } from 'react'
import { noop } from '@toptal/picasso/utils'

import {
  BaseEndpoints,
  HandleEmitOutboundEvent,
  HandleInboundEvent,
  HandleInboundEventUnsubscribe
} from '../../../@types/types'

export interface ExternalIntegratorContextProps {
  handleInboundEvent: HandleInboundEvent
  handleInboundEventUnsubscribe: HandleInboundEventUnsubscribe
  handleOutboundEventEmit: HandleEmitOutboundEvent
  throwBoundaryErrorsToHostApp?: boolean
  modalContainer?: HTMLElement
  endpoints: BaseEndpoints
}

export const ExternalIntegratorContext =
  createContext<ExternalIntegratorContextProps>({
    handleInboundEvent: noop,
    handleInboundEventUnsubscribe: noop,
    handleOutboundEventEmit: noop,
    throwBoundaryErrorsToHostApp: false,
    endpoints: {
      Gateway: '',
      Platform: '',
      Kipper: ''
    }
  })

export const useExternalIntegratorContext = () =>
  useContext(ExternalIntegratorContext)
