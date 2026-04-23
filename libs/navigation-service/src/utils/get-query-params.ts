import { createUrl } from './create-url'
/**
Returns the query string from the provided url

@param url - url with query params
@param options.addQueryPrefix - a flag that indicates to add '?' at the start or not

@example
```
getQueryParams('http://my-site.com/?a=b') => "a=b"
getQueryParams('http://my-site.com/?a=b&c=d', { addQueryPrefix: true }) => "?a=b&c=d"
```
*/
export const getQueryParams = (
  url: string,
  { addQueryPrefix }: { addQueryPrefix: boolean } = { addQueryPrefix: false }
) => {
  const { search } = createUrl(url)

  return addQueryPrefix ? search : search.substring(1)
}
