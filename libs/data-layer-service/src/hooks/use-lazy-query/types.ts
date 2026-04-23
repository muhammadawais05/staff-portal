import {
  LazyQueryHookOptions as ApolloLazyQueryHookOptions,
  QueryResult as ApolloLazyQueryResult
} from '@apollo/client'
import { QueryLazyOptions, QueryResult } from '@apollo/client/react/types/types'
import { NetworkStatus } from '@apollo/client/core'
export {
  QueryHookAdditionalOptions as LazyQueryHookAdditionalOptions,
  ErrorFilterType,
  ErrorFilter
} from '../use-query/types'

declare type Impartial<T> = {
  [P in keyof T]?: never
}

declare type UnexecutedLazyFields = {
  loading: false
  networkStatus: NetworkStatus.ready
  called: false
  data: undefined
  previousData?: undefined
}

declare type AbsentLazyResultFields = Omit<
  Impartial<QueryResult<unknown, unknown>>,
  keyof UnexecutedLazyFields
>
declare type UnexecutedLazyResult = UnexecutedLazyFields &
  AbsentLazyResultFields

export declare type LazyQueryResult<TData, TVariables> = (
  | UnexecutedLazyResult
  | ApolloLazyQueryResult<TData, TVariables>
) & {
  initialLoading: boolean
}

export type LazyQueryHookOptions<T, V> = ApolloLazyQueryHookOptions<T, V>

export type LazyQueryTuple<TData, TVariables> = [
  (options?: QueryLazyOptions<TVariables>) => void,
  LazyQueryResult<TData, TVariables>
]
