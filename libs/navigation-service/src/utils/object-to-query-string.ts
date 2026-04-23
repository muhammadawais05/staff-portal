import qs from 'qs'

import { DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS } from '../constants'
import { ObjectToQueryStringOptions, QueryStringParams } from '../types'

/**
Converts { key: value } object to the query string

@param query - { key: value } object, where `key` - name of the param and `value` - its value
@param options - options how to stringify an object

@example
```
objectToQueryString({ foo: 'bar', zoo: 'test' }) // => 'foo=bar&zoo=test'
objectToQueryString({ foo: ['a', 'b'] }) // => 'foo%5B%5D=a&foo%5B%5D=b'
```
*/
export const objectToQueryString = (
  query: QueryStringParams,
  options: ObjectToQueryStringOptions = DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS
) => qs.stringify(query, options)
