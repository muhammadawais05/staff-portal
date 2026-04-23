import {
  QueryHookOptions as ApolloQueryHookOptions,
  QueryResult as ApolloQueryResult,
  ApolloError
} from '@apollo/client'

export type QueryHookOptions<T, V> = ApolloQueryHookOptions<T, V>

export interface QueryResult<TData, TVariables>
  extends Omit<ApolloQueryResult<TData, TVariables>, 'previousData'> {
  initialLoading: boolean
}
export type ErrorFilterType = ApolloError | undefined
export type ErrorFilter<T = ErrorFilterType> = (error: T) => T

export type QueryHookAdditionalOptions = {
  throwOnError?: boolean
  errorFilters?: ErrorFilter[]
}
