import { defineMessage } from '@toptal/staff-portal-message-bus'

import { TypedModal, BaseModalOptions, PayloadOf } from './types'

export const SHOW_MODAL = defineMessage<{
  modal: TypedModal
  payload: PayloadOf<TypedModal>
  modalCallerId?: number
  options?: BaseModalOptions
}>()
export const UPDATE_MODAL = defineMessage<{
  modal: TypedModal
  payload: PayloadOf<TypedModal>
  modalCallerId: number
}>()
export const MODAL_CALLER_UNMOUNT = defineMessage<{
  modal: TypedModal
  modalCallerId: number
}>()
