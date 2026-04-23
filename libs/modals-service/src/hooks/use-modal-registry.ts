import {
  TypedModalWithQueryParams,
  ModalOptions,
  ModalRegistry,
  GetModalFn,
  TypedLegacyHashModal
} from '../types'

type ModalRegistryMap = Map<
  TypedModalWithQueryParams | TypedLegacyHashModal,
  ModalOptions<TypedModalWithQueryParams> | ModalOptions<TypedLegacyHashModal>
>

// wrapper around modals registry with a bit more type safety
export const useModalRegistry = () => {
  // always spawn new registry whenever app is updated
  const registry: ModalRegistryMap = new Map()

  const modalRegistry: ModalRegistry = {
    set: (modal, options) => {
      registry.set(modal, options)

      return modalRegistry
    },
    get: ((modal: TypedModalWithQueryParams | TypedLegacyHashModal) =>
      registry.get(modal)) as GetModalFn,
    delete: (modal: TypedModalWithQueryParams | TypedLegacyHashModal) =>
      registry.delete(modal),
    keys: () => Array.from(registry.keys())
  }

  return modalRegistry
}
