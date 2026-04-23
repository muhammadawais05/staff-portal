import {
  ApolloError,
  ApolloQueryResult,
  WatchQueryFetchPolicy
} from '@staff-portal/data-layer-service'

import { PerformedAction, Literal } from '../template-compiler'

export interface Entry {
  performedAction: PerformedAction
  literals: Literal[]
}

export type Feeds = string[][]

export type DateRange = {
  from: string
  till: string
}

export type PayloadFilter = {
  path: string[]
  operation: 'EQ' | 'CONTAINS'
  value: string
}

export type SearchChroniclesVariables = {
  feeds?: Feeds
  actions?: string[]
  occurredAt?: DateRange
  before?: string
  after?: string
  limit?: number | null
  subjectGids?: string[]
  performerGids?: string[]
  payload?: PayloadFilter
}

export interface BaseQueryOptions {
  skip?: boolean
  pollInterval?: number
  fetchPolicy?: WatchQueryFetchPolicy
}

export type QueryResult<T> = {
  data: T[]
  error?: ApolloError
  initialLoading: boolean
  loading: boolean
  fetchMoreLoading?: boolean
  fetchMore: () => Promise<ApolloQueryResult<unknown>>
  hasMore: boolean
}

export type HistoryWidgetVariant = 'table' | 'timeline'
