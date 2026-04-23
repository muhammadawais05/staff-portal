import { useCallback } from 'react'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
  ApolloError,
  OperationVariables,
  QueryHookAdditionalOptions,
  QueryHookOptions,
  filterInvalidArgumentSyntaxErrors,
  useQuery
} from '@staff-portal/data-layer-service'

import useNotifications from './use-notifications'

export const useGetSearchList = <
  TData = object,
  TVariables = OperationVariables
>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables> &
    Omit<QueryHookAdditionalOptions, 'throwOnError'>
) => {
  const { showError } = useNotifications()

  const onError = useCallback(
    (error: ApolloError) => {
      options?.onError?.(error)

      showError('Invalid arguments syntax. Please adjust your query.')
    },
    [showError, options]
  )

  return useQuery<TData, TVariables>(document, {
    ...options,
    throwOnError: true,
    // needed in order to always get the latest data
    fetchPolicy: 'network-only',
    errorFilters: [
      ...(options?.errorFilters || []),
      filterInvalidArgumentSyntaxErrors
    ],
    onError
  })
}

export default useGetSearchList
