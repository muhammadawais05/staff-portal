import {
  generatePath,
  objectToQueryString,
  QueryStringParams
} from '@staff-portal/navigation'

import { RouteParametersOf, RouteType } from '../../types'

const generateRoutePath = <R extends RouteType<RouteParametersOf<R>>>(
  route: R | string,
  {
    parameters,
    searchParams
  }: {
    parameters?: RouteParametersOf<R>
    searchParams?: QueryStringParams
  } = {}
) => {
  let newPath = typeof route === 'string' ? route : route.path

  if (parameters) {
    newPath = generatePath(newPath, parameters as RouteParametersOf<string>)
  }

  if (searchParams) {
    const queryString = objectToQueryString(searchParams)

    newPath = queryString ? `${newPath}?${queryString}` : newPath
  }

  return newPath
}

export default generateRoutePath
