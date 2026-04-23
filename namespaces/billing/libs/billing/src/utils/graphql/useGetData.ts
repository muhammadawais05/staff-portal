import { FetchPolicy } from '@apollo/client'
import { MutableRefObject } from 'react'
import { ABORT_KEY } from '@topkit/apollo-client'
import { QueryResult, QueryHookOptions } from '@staff-portal/data-layer-service'

export interface UseGetDataResult<
  TData,
  TVariables,
  TDataKey extends keyof TData
> extends Omit<QueryResult<TData, TVariables>, 'data'> {
  data: Exclude<TData[TDataKey], null | undefined>
}

type UUIDRefObj = string | MutableRefObject<string | object>

export const useGetData =
  <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TData extends { [key in TDataKey]?: any },
    TVariables,
    TDataKey extends keyof TData = keyof TData
  >(
    hook: (
      options: QueryHookOptions<TData, TVariables>
    ) => QueryResult<TData, TVariables>,
    key: TDataKey
    // eslint-disable-next-line complexity
  ) =>
  (
    variables: TVariables,
    {
      abortKey,
      fetchPolicy
    }: {
      abortKey?: UUIDRefObj
      fetchPolicy?: FetchPolicy
    } = {}
  ): UseGetDataResult<TData, TVariables, TDataKey> => {
    const { data, ...rest } = hook({
      variables,
      context: {
        // pass to cancel previous requests
        [ABORT_KEY]: typeof abortKey === 'object' ? abortKey?.current : abortKey
      },
      fetchPolicy
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
