import { QueryStringParams } from '../types'
import { getQueryParams } from './get-query-params'
import { queryStringToObject } from './query-string-to-object'
import { setQueryParams } from './set-query-params'

/**
Adds query params to the url.
How existing params will be merged with new params can be modified with mergeStrategy param

@param url - url with or without query params
@param query - { key: value } object, where `key` - name of the param and `value` - its value
@param mergeStrategy - function that defines how existing params will be merged with new params

@example
```
addQueryParams('http://my-site.com/?zoo=test', { foo: 'bar' }) // => 'http://my-site.com/?zoo=test&foo=bar'
addQueryParams('http://my-site.com/?a=test&b[]=val1&b[]=val2', { b: 'bar' }) // => 'http://my-site.com/?a=test&b=bar'
```
*/
export const addQueryParams = (
  url: string,
  query: QueryStringParams,
  mergeStrategy = (prev: QueryStringParams, next: QueryStringParams) => ({
    ...prev,
    ...next
  })
) =>
  setQueryParams(
    url,
    mergeStrategy(queryStringToObject(getQueryParams(url)), query)
  )
