import { QueryResult, QueryHookOptions } from '@staff-portal/data-layer-service'

import { useGetData } from '.'

export const useGetNodes = <
  TData extends { nodes?: Partial<{}> | null },
  TVariables
>(
  hook: (
    options: QueryHookOptions<TData, TVariables>
  ) => QueryResult<TData, TVariables>
) => useGetData<TData, TVariables>(hook, 'nodes')
