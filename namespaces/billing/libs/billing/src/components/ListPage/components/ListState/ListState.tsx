import React, { Context, FC, useCallback, useMemo } from 'react'
import { useApolloClient, ApolloClient } from '@apollo/client'
import { GqlParams, toGqlFilter, toGqlPagination } from '@staff-portal/filters'
import {
  useQueryParamsState,
  QueryParamsOptions
} from '@staff-portal/query-params-state'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import { noop } from '@toptal/picasso/utils'
import { OffsetPagination } from '@staff-portal/graphql/staff'
import { QueryResult } from '@staff-portal/data-layer-service'

import { rejectEmpty } from '../../../../utils/listSearch'
import { useRefetch } from '../../../../_lib/helpers/apollo/useRefetch'
import {
  LIST_PAGE_SIZE,
  Entities,
  ListContextType,
  ListQueryParams
} from '../../../ListContext/ListContext'

interface UseGetDataHookVariables<TFilter> {
  filter: TFilter
  pagination: OffsetPagination
}

interface UseGetDataHook<TFilter> {
  gqlVariables: UseGetDataHookVariables<TFilter>
}

export interface UseGetDataHookResult<TData, TFilter> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extends Omit<QueryResult<any, UseGetDataHookVariables<TFilter>>, 'data'> {
  data?: TData
}

export interface ListStateOptions<
  List,
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
> {
  context: Context<ListContextType<List, Totals, TFilter, URLParams>>
  useGetList: ({
    gqlVariables
  }: UseGetDataHook<TFilter>) => UseGetDataHookResult<List, TFilter>
  useGetTotals?: ({
    gqlVariables
  }: UseGetDataHook<TFilter>) => UseGetDataHookResult<Totals, TFilter>
  getQueryParamsConfig: (client: ApolloClient<object>) => QueryParamsOptions
  getGqlParamsConfig: () => GqlParams
  updateDataEvents: TypedMessage<undefined>[]
}

interface ContextChildrenProps<
  List,
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
> {
  page?: string | number
  pageSize: number
  filter: TFilter
  pagination: OffsetPagination
  urlValues: Partial<URLParams>
  list: Entities<List>
  totals?: Entities<Totals>
  onPageChange: (page: number) => void
}

interface Props<
  List,
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
> {
  children: FC<ContextChildrenProps<List, Totals, TFilter, URLParams>>
  options: ListStateOptions<List, Totals, TFilter, URLParams>
}

const ListState = <
  List,
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
>({
  children,
  options
}: Props<List, Totals, TFilter, URLParams>) => {
  const {
    context,
    useGetList,
    useGetTotals,
    getQueryParamsConfig,
    getGqlParamsConfig,
    updateDataEvents
  } = options

  const client = useApolloClient()

  const queryParamsConfig = useMemo(
    () => getQueryParamsConfig(client),
    [getQueryParamsConfig, client]
  )
  const gqlParamsConfig = useMemo(getGqlParamsConfig, [getGqlParamsConfig])
  const [rawUrlValues, setUrlValues, resolving] =
    useQueryParamsState<Partial<URLParams>>(queryParamsConfig)

  const urlValues = rejectEmpty(rawUrlValues)

  const { page } = urlValues
  const pageSize = LIST_PAGE_SIZE
  const filter = toGqlFilter<Partial<URLParams>, TFilter>(
    gqlParamsConfig,
    urlValues
  )
  const pagination = toGqlPagination(pageSize, page)
  const gqlVariables = { filter, pagination }

  const onPageChange = useCallback(
    (newPage: number) => setUrlValues({ ...urlValues, page: newPage }),
    [urlValues, setUrlValues]
  )

  const {
    data,
    loading,
    initialLoading,
    error,
    refetch: refetchList
  } = useGetList({ gqlVariables })

  const {
    data: totals,
    loading: totalsLoading,
    initialLoading: totalsInitialLoading,
    error: totalsError,
    refetch: refetchTotals
  } = useGetTotals?.({ gqlVariables }) || {}

  useRefetch(updateDataEvents, refetchList)
  useRefetch(updateDataEvents, refetchTotals || noop)

  return (
    <context.Provider
      value={{
        totals:
          useGetTotals &&
          ({
            data: totals,
            loading: totalsLoading,
            initialLoading: totalsInitialLoading,
            error: totalsError,
            refetch: refetchTotals
          } as Entities<Totals>),
        list: {
          data,
          loading,
          initialLoading,
          error,
          refetch: refetchList
        },
        filter,
        page,
        pageSize,
        onPageChange,
        pagination,
        resolving,
        setUrlValues,
        urlValues
      }}
    >
      {children({
        totals:
          useGetTotals &&
          ({
            data: totals,
            loading: totalsLoading,
            initialLoading: totalsInitialLoading,
            refetch: refetchTotals
          } as Entities<Totals>),
        list: {
          data,
          loading,
          initialLoading,
          error,
          refetch: refetchList
        },
        filter,
        page,
        pageSize,
        onPageChange,
        pagination,
        urlValues
      })}
    </context.Provider>
  )
}

export default ListState
