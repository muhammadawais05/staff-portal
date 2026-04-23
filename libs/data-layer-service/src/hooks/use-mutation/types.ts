import {
  ApolloError,
  MutationResult as ApolloMutationResult,
  MutationHookOptions as ApolloMutationHookOptions
} from '@apollo/client'
import { MutationFunctionOptions } from '@apollo/client/react/types/types'
import { FetchResult } from '@apollo/client/link/core'

export type MutationResult<TData> = ApolloMutationResult<TData>

export type MutationValidationError = {
  errorId?: string
  field: string
  key: string
  message: string
}

export type MutationHookOptions<TData, TVariables> = ApolloMutationHookOptions<
  TData,
  TVariables
> & {
  onValidationError?: (errors: MutationValidationError[]) => void
  onRootLevelError?: (error: ApolloError) => void
}

export type MutationTuple<TData, TVariables> = [
  (
    options?: MutationFunctionOptions<TData, TVariables>
  ) => Promise<FetchResult<TData>>,
  MutationResult<TData>
]
