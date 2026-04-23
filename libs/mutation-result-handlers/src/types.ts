import { ReactNode } from 'react'
import type { PayloadOf, TypedMessage } from '@toptal/staff-portal-message-bus'
import {
  ApolloError,
  TypedDocumentNode
} from '@staff-portal/data-layer-service'

import type { MutationResult } from './form-error-handler'
import { HandleMutationResultOptions } from './form-error-handler/hooks'

type GetSuccessNotificationMessage<TMutationInput> = (
  input: Partial<TMutationInput>
) => ReactNode

export type SuccessMessageEmitOptions<TEmitMessageType> =
  TEmitMessageType extends TypedMessage<infer P>
    ? P extends undefined
      ? {
          type: TEmitMessageType
        }
      : {
          type: TEmitMessageType
          payload: PayloadOf<TEmitMessageType>
        }
    : never

export type UseChangeHandlerProps<
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>,
  TInitialValues extends Partial<TMutationInput>,
  TEmitMessageType,
  MutationVariables extends {} = {}
> = {
  mutationDocument: TypedDocumentNode<
    TMutationResponse,
    { input: TMutationInput } & MutationVariables
  >
  /**
   * Used to create options, which are passed internally into `handleMutationResult`
   *
   * If omitted then the first key of mutation response will be used
   */
  mutationResultOptions?: Omit<
    HandleMutationResultOptions<TMutationResult>,
    'mutationResult'
  > & {
    mutationResult?: keyof TMutationResponse
    successMessageEmitOptions?: SuccessMessageEmitOptions<TEmitMessageType>
    successNotificationMessage?:
      | HandleMutationResultOptions<TMutationResult>['successNotificationMessage']
      | GetSuccessNotificationMessage<TMutationInput>
  }
  /** Values required for mutation */
  requiredValues: Omit<TMutationInput, keyof TInitialValues>
  initialValues: TInitialValues
  errorNotificationMessage?: string
  isValueChanged?: (
    key: keyof Partial<TMutationInput>,
    oldValue: Partial<TMutationInput>,
    newValue: Partial<TMutationInput>
  ) => boolean
  onCompleted?: (data: TMutationResponse) => void
  onError?: (error: ApolloError) => void
}

export type UseModalFormChangeHandlerProps<
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult = MutationResult,
  TMutationInput extends Record<PropertyKey, unknown> = Record<
    PropertyKey,
    unknown
  >,
  TInitialValues extends Partial<TMutationInput> = Partial<TMutationInput>,
  TEmitMessageType extends TypedMessage<unknown> = TypedMessage<unknown>,
  MutationVariables extends { input: TMutationInput } = {
    input: TMutationInput
  }
> = Omit<
  UseChangeHandlerProps<
    TMutationResponse,
    TMutationResult,
    TMutationInput,
    TInitialValues,
    TEmitMessageType,
    MutationVariables
  >,
  'requiredValues' | 'initialValues' | 'isValueChanged'
>

export type OptionalKeys<T extends object> = {
  [Key in keyof T]: {} extends Pick<T, Key> ? Key : never
}[keyof T]
