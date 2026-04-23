import { MutableRefObject } from 'react'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import {
  QueryResult,
  QueryHookOptions,
  useQuery as makeQuery
} from '../../hooks'
import { QueryHookAdditionalOptions } from '../../hooks/use-query/types'

export type AbortKey = string

export interface UseGetDataResult<
  TData,
  TVariables,
  TDataKey extends keyof TData
> extends Omit<QueryResult<TData, TVariables>, 'data'> {
  data: Exclude<TData[TDataKey], undefined>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any
type UUIDRefObj = AbortKey | MutableRefObject<AbortKey>

export const useGetData =
  <
    TData extends { [key in TDataKey]?: Value },
    TVariables,
    TDataKey extends keyof TData = keyof TData
  >(
    document: TypedDocumentNode<TData, TVariables>,
    key: TDataKey
  ) =>
  (
    variables?: TVariables,
    {
      throwOnError = true,
      // TODO : topkit/apollo-client cancel link abort key
      //   will be used for batching
      // abortKey,
      ...options
    }: QueryHookOptions<TData, TVariables> &
      QueryHookAdditionalOptions & {
        abortKey?: UUIDRefObj
      } = {}
  ): UseGetDataResult<TData, TVariables, TDataKey> => {
    const { data, ...rest } = makeQuery(document, {
      throwOnError,
      variables,
      context: {
        // TODO : topkit/apollo-client cancel link abort key
        //   will be used for batching
        // pass to cancel previous requests
        // abortKey: typeof abortKey === 'object' ? abortKey?.current : abortKey
        ...options.context
      },
      ...options
    })

    const nodeData = (data ? data[key] : undefined) as Exclude<
      TData[TDataKey],
      undefined
    >

    return {
      ...rest,
      data: nodeData
    }
  }
