import {
  TypedModal,
  TypedModalWithQueryParams,
  TypedLegacyHashModal
} from './types'

export const defineModalWithQueryParams = <
  P = undefined,
  Q extends Record<string, string | number> = Record<string, string | number>
>(
  modalName: string
): TypedModalWithQueryParams<P, Q> => ({
  name: modalName,
  type: 'query_params_modal'
})

export const isQueryParamsModal = (
  modal: TypedModal
): modal is TypedModalWithQueryParams =>
  (modal as TypedModalWithQueryParams).type === 'query_params_modal'

export const isLegacyHashModal = (
  modal: TypedModal
): modal is TypedLegacyHashModal =>
  (modal as TypedLegacyHashModal).type === 'legacy_hash_modal'

export const defineLegacyHashModal = <P = undefined>(
  name: string
): TypedLegacyHashModal<P> => ({
  type: 'legacy_hash_modal',
  name
})
