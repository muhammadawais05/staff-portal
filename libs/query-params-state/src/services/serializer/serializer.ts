import {
  objectToQueryString,
  queryStringToObject,
  DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS
} from '@staff-portal/navigation'

import { QueryParams } from '../../types'

export const serialize = (values: QueryParams): string =>
  objectToQueryString(values, {
    ...DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS,
    addQueryPrefix: true
  })

export const deserialize = (query: string): QueryParams =>
  queryStringToObject(query)
