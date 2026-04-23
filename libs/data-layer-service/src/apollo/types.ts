import type { PureQueryOptions, RefetchQueriesFunction } from '@apollo/client'

export type RefetchQueries =
  | (string | PureQueryOptions)[]
  | RefetchQueriesFunction
