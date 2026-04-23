import { ObjectToQueryStringOptions, QueryStringToObjectOptions } from './types'

export const DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS: ObjectToQueryStringOptions = {
  arrayFormat: 'brackets',
  skipNulls: true,
  format: 'RFC1738',
  filter: (_, value) => (value === '' ? undefined : value)
}

export const DEFAULT_QUERY_STRING_TO_OBJECT_OPTIONS: QueryStringToObjectOptions = {
  ignoreQueryPrefix: true
}
