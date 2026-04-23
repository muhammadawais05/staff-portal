import {
  DocumentNode,
  OperationVariables,
  useLazyQuery as ApolloUseLazyQuery
} from '@apollo/client'
import { useRef } from 'react'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import {
  LazyQueryTuple,
  LazyQueryHookOptions,
  LazyQueryHookAdditionalOptions,
  ErrorFilterType,
  ErrorFilter
} from './types'

export const useLazyQuery = <TData = object, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: LazyQueryHookOptions<TData, TVariables> &
    LazyQueryHookAdditionalOptions
): LazyQueryTuple<TData, TVariables> => {
  const cachedData = useRef<TData>()
  const [request, { data, loading, error, ...rest }] = ApolloUseLazyQuery<
    TData,
    TVariables
  >(query, {
    ...options
  })

  if (options?.throwOnError && !data && error) {
    const throwOnErrorOptions = options as LazyQueryHookAdditionalOptions

    if (!throwOnErrorOptions.errorFilters) {
      throw error
    }

    const filteredError = throwOnErrorOptions.errorFilters.reduce(
      (prevError: ErrorFilterType, errorFilter: ErrorFilter) =>
        errorFilter(prevError),
      error
    )

    if (filteredError) {
      throw filteredError
    }
  }

  // Calling the 'request' callback always sets the 'previousData' to 'undefined': https://github.com/apollographql/apollo-client/issues/7396
  // It's a temporary solution to provide the 'previousData' until the issue is not resolved.
  if (data) {
    cachedData.current = data
  }

  const previousData = cachedData.current

  // we can possible check networkStatus here, but seems like it works without that
  const initialLoading = loading && previousData === undefined

  return [
    request,
    {
      ...rest,
      data: data ?? previousData,
      error,
      initialLoading,
      loading
    }
  ] as LazyQueryTuple<TData, TVariables>
}
