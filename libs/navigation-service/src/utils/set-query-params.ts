import { createUrl } from './create-url'
import { ObjectToQueryStringOptions, QueryStringParams } from '../types'
import { objectToQueryString } from './object-to-query-string'
import { DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS } from '../constants'

/**
Replace all existing query params in url with new params

@param url - url with or without query params
@param query - { key: value } object, where `key` - name of the param and `value` - its value
@param options - options how to stringify an object

@example
```
setQueryParams('http://my-site.com/?foo=test', { bar: 'value' }) // => 'http://my-site.com/?bar=value'
setQueryParams('http://my-site.com/?foo=test', {}) // => 'http://my-site.com/'
```
*/
export const setQueryParams = (
  url: string,
  query: QueryStringParams,
  options: ObjectToQueryStringOptions = DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS
) => {
  const { origin, pathname, hash } = createUrl(url)

  return (
    origin +
    pathname +
    objectToQueryString(query, {
      ...options,
      addQueryPrefix: true
    }) +
    hash
  )
}
