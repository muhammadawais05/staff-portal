import qs from 'qs'

import { DEFAULT_QUERY_STRING_TO_OBJECT_OPTIONS } from '../constants'
import { QueryStringToObjectOptions } from '../types'

/**
Converts query string to { key: value } object

@param query - query string
@param options - options how to parse a string

@example
```
queryStringToObject('?foo=bar') // => { foo: 'bar' }
queryStringToObject('a[]=b&a[]=c') // => { a: ['b', 'c'] }
```
*/
export const queryStringToObject = (
  query: string,
  options: QueryStringToObjectOptions = DEFAULT_QUERY_STRING_TO_OBJECT_OPTIONS
) => qs.parse(query, options)
