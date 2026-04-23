import { QueryParams } from '@staff-portal/query-params-state'
import { createContext } from 'react'
import noop from '@toptal/picasso/utils/noop'
import { ApolloError } from '@apollo/client'
import { OffsetPagination } from '@staff-portal/graphql/staff'

import { BadgesKeys } from '../../utils/types'

export const LIST_PAGE_SIZE = 25

export interface ListQueryParams extends QueryParams {
  badges?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in BadgesKeys]: Record<any, string>[]
  }
  page?: string | number
}

export interface Entities<Type> {
  data: Type | undefined
  loading: boolean
  error?: ApolloError
  initialLoading: boolean
  refetch: () => void
}

export interface ListContextType<
  List = {},
  Totals = {},
  TFilter = {},
  URLParams extends ListQueryParams = ListQueryParams
> {
  list: Entities<List>
  totals?: Entities<Totals>
  filter: TFilter
  pagination: OffsetPagination
  page?: string | number
  pageSize?: number
  onPageChange: (page: number) => void
  resolving?: boolean
  setUrlValues: (
    newValues: Partial<URLParams>,
    options?: Record<string, unknown>
  ) => void
  urlValues: Partial<URLParams>
}

export const createListContext = <
  List,
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
>() =>
  createContext<ListContextType<List, Totals, TFilter, URLParams>>({
    list: {
      data: undefined,
      loading: false,
      refetch: noop,
      initialLoading: false
    },
    totals: {
      data: undefined,
      loading: false,
      refetch: noop,
      initialLoading: false
    },
    filter: {} as TFilter,
    pagination: { limit: 0, offset: 0 },
    pageSize: LIST_PAGE_SIZE,
    onPageChange: noop,
    resolving: false,
    setUrlValues: noop,
    urlValues: {} as URLParams
  })
