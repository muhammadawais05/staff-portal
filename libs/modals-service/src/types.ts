/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'

export type ModalComponentBaseProps = {
  hideModal: () => void
  isTopModal: boolean
}

export type Modal<Payload = any> = Payload extends undefined
  ? FC<ModalComponentBaseProps>
  : FC<ModalComponentBaseProps & Payload>

export type TypedModalWithQueryParams<Payload = any, QueryParams = any> = {
  __payloadType?: Payload
  __queryParamsType?: QueryParams
  type: 'query_params_modal'
  name: string
}

export type TypedLegacyHashModal<Payload = any> = {
  __payloadType?: Payload
  type: 'legacy_hash_modal'
  name: string
}

export type UrlModal<Payload = any> =
  | TypedModalWithQueryParams<Payload>
  | TypedLegacyHashModal<Payload>

export type TypedModal<Payload = any> = Modal<Payload> | UrlModal<Payload>

export type PayloadOf<M> = M extends UrlModal<infer PayloadType>
  ? PayloadType
  : M extends Modal<infer PayloadType>
  ? Omit<PayloadType, 'hideModal' | 'isTopModal'>
  : never

export type ModalInstance = {
  modal: TypedModal
  initialPayload: PayloadOf<TypedModal>
  modalCallerId?: number
  options: ModalOptions<TypedModal>
}

export type QueryParamsOf<M> = M extends TypedModalWithQueryParams<
  any,
  infer QueryParamsType
>
  ? QueryParamsType
  : never

export type ModalPayloadFromQueryParamsFn<M extends TypedModal> = (
  queryParams: Record<string, unknown>,
  helpers: { showWarning: (message?: string) => false }
) => PayloadOf<M> | false

export type ModalComponentProps<M extends TypedModal> =
  PayloadOf<M> extends undefined
    ? ModalComponentBaseProps
    : ModalComponentBaseProps & PayloadOf<M>

export type BaseModalOptions = { leaveOnCallerUnmount?: true }

export type ModalOptions<M extends TypedModal> = M extends TypedLegacyHashModal
  ? PayloadOf<M> extends undefined
    ? never
    : BaseModalOptions & {
        Component: FC<ModalComponentProps<M>>
        /**
         * If need to extract variables from url, it must use named groups feature `(<?groupName>...)`
         * e.g. `/#modal=/clients/(<?clientId>\d+)/`.
         *
         * Avoid using `g`, `y` flags!
         *
         * Groups names must correspond to Modal payload props.
         * */
        pattern: RegExp
        mapHashToPayload: (
          parsedFromHash: {
            [K in keyof PayloadOf<M>]: string
          },
          helpers: { showWarning: (message?: string) => false }
        ) => PayloadOf<M> | false
        mapPayloadToHash: (payload: PayloadOf<M>) => string
      }
  : M extends TypedModalWithQueryParams
  ? PayloadOf<M> extends undefined
    ? BaseModalOptions & {
        Component: FC<ModalComponentProps<M>>
      }
    : BaseModalOptions & {
        Component: FC<ModalComponentProps<M>>
        queryParams: {
          to: (payload: PayloadOf<M>) => QueryParamsOf<M>
          from: ModalPayloadFromQueryParamsFn<M>
        }
      }
  : BaseModalOptions

export type GetModalFn = <M extends UrlModal>(
  modal: M
) => ModalOptions<M> | undefined

export type SetModalFn = <M extends UrlModal>(
  modal: M,
  options: ModalOptions<M>
) => ModalRegistry

export type UseModalHook = <M extends TypedModal>(
  ...args: M extends TypedModal<undefined>
    ? [modal: M, payload?: PayloadOf<M> | null, options?: BaseModalOptions]
    : [modal: M, payload: PayloadOf<M> | null, options?: BaseModalOptions]
) => UseModalResult<M>

export type UseModalResult<M extends TypedModal> =
  M extends TypedLegacyHashModal
    ? {
        showLegacyHashModal: () => void
      }
    : M extends TypedModalWithQueryParams
    ? {
        showModal: () => void
        showDetachedModal: M extends TypedModal<undefined>
          ? () => void
          : (payload: PayloadOf<M>) => void
        showModalWithQueryParams: () => void
        queryParams: QueryParamsOf<M>
      }
    : {
        showModal: () => void
        showDetachedModal: M extends TypedModal<undefined>
          ? () => void
          : (payload: PayloadOf<M>) => void
      }

export type ModalRegistry = {
  get: GetModalFn
  set: SetModalFn
  keys: () => UrlModal[]
  delete: (modal: UrlModal) => void
}
