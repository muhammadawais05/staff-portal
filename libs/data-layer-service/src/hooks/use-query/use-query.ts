import {
  useQuery as ApolloUseQuery,
  DocumentNode,
  OperationVariables
} from '@apollo/client'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import {
  QueryHookOptions,
  QueryResult,
  QueryHookAdditionalOptions,
  ErrorFilterType,
  ErrorFilter
} from './types'

export const useQuery = <TData = object, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables> & QueryHookAdditionalOptions
): QueryResult<TData, TVariables> => {
  const { throwOnError, ...restOptions } = options || {}

  const { data, loading, error, previousData, ...rest } = ApolloUseQuery<
    TData,
    TVariables
  >(query, {
    errorPolicy: 'all',

    // todo : enable networkStatusChange. at the moment it's not possible to enable it because of the wrongly made mocks,
    //   as soon as you've enabled it, you'll see some issues like `Cache data may be lost when replacing the operations field of a .... object.`
    // notifyOnNetworkStatusChange: true,

    // todo : enable default fetch policy.
    //  be aware: could cause some issues with too rugged caching for `cache-and-network` policy
    //  so please enable it softly and check that everything works fine
    // fetchPolicy: options?.fetchPolicy ?? 'cache-and-network',

    ...restOptions
  })

  if (throwOnError && !data && error) {
    if (restOptions.onError) {
      restOptions.onError(error)
    }

    const throwOnErrorOptions = options as QueryHookAdditionalOptions

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

  // we can possible check networkStatus here, but seems like it works without that
  const initialLoading = loading && previousData === undefined

  return {
    ...rest,
    data: data ?? previousData,
    error,
    initialLoading,
    loading
  }
}
