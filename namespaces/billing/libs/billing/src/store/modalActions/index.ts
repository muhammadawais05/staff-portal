import { SyntheticEvent } from 'react'

import { ModalKey } from '../../@types/types'
import { NodeIdPrefix } from '../../_lib/helpers/apollo'

export interface ModalData {
  data?: Record<string, unknown>
  billingCycleId?: string
  clientId?: string
  engagementId?: string
  consolidationDefaultId?: string
  initialValues?: {}
  /**
   * @deprecated : use nodeId + nodeType
   */
  invoiceId?: string
  isVerify?: boolean
  memorandumId?: string
  nodeId?: string
  nodeType?: keyof typeof NodeIdPrefix
  notableId?: string
  notableType?: string
  transferId?: string
  variant?: ModalVariant | null
}

export type ModalVariant = 'normal' | 'extraHours' | 'pending' | 'all'

export type ModalProps = {
  [key in ModalVariant]?: {
    handleNavigateTo?: (event: SyntheticEvent<HTMLButtonElement>) => void
    canMovePrev?: boolean
    canMoveNext?: boolean
  }
}

interface ModalDataPayload {
  modalName: ModalKey
  options: ModalData
  props: ModalProps
}

export interface ModalStore {
  modal: {
    modalName: ModalKey | undefined
    visible: boolean
    options: ModalData
    props: ModalProps
  }
}

export const modalInitialState: ModalStore = {
  modal: {
    modalName: undefined,
    visible: false,
    options: {},
    props: {}
  }
}

export interface InitializeModalAction {
  payload: Pick<ModalDataPayload, 'modalName'>
}

export interface ShowModalAction {
  payload: Pick<ModalDataPayload, 'modalName' | 'options'>
}

export interface SetModalPropAction {
  payload: Pick<ModalDataPayload, 'props'>
}

export const modalActions = {
  hideModal(state: ModalStore) {
    return {
      modal: {
        ...state.modal,
        visible: false
      }
    }
  },
  setModalProps(state: ModalStore, action: SetModalPropAction) {
    return {
      modal: {
        ...state.modal,
        props: {
          ...state.modal.props,
          ...action.payload.props
        }
      }
    }
  },
  showModal(state: ModalStore, action: ShowModalAction) {
    return {
      modal: {
        ...state.modal,
        modalName: action.payload.modalName,
        visible: true,
        options: action.payload.options
      }
    }
  }
}
