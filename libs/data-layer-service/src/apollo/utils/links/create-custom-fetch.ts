import { addQueryParams } from '@staff-portal/navigation'

export const createCustomFetch = (isEnabled?: boolean) => {
  if (!isEnabled) {
    return
  }

  return (uri: RequestInfo, options: RequestInit) => {
    try {
      // we need to support both batched and non-batched queries
      const operationNames = [JSON.parse(options.body as string)]
        .flat()
        .map(({ operationName }) => operationName)
        .toString()
      const url = addQueryParams(typeof uri === 'string' ? uri : uri.url, {
        operationNames
      })

      return fetch(url, options)
    } catch {
      return fetch(uri, options)
    }
  }
}
