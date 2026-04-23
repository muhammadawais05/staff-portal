import React, { PropsWithChildren } from 'react'
import {
  Redirect,
  useRouteMatch,
  useLocation,
  generatePath
} from '@staff-portal/navigation'

const RouteParamSanitizer = ({ children }: PropsWithChildren<{}>) => {
  const {
    params: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _,
      ...restParams
    },
    url,
    path
  } = useRouteMatch<{ [key: string]: string | undefined }>()
  const { search, hash } = useLocation()

  const cleanUrl = generatePath(path, restParams)

  if (cleanUrl === url) {
    return <>{children}</>
  }

  return <Redirect to={`${cleanUrl}${search}${hash}`} />
}

export default RouteParamSanitizer
