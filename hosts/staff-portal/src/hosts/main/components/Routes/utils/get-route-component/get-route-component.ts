import { RoutePath } from '@staff-portal/routes'

import { RoutesMapping } from '../../../../config'

export const getRouteComponent = (routePath?: RoutePath | RoutePath[]) => {
  if (!routePath?.length) {
    throw new Error('Empty path is not allowed!')
  }

  if (Array.isArray(routePath)) {
    return RoutesMapping[routePath[0]]
  }

  return RoutesMapping[routePath]
}
