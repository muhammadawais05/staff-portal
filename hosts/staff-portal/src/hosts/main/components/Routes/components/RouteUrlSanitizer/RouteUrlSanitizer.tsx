import React, { ReactNode } from 'react'
import { Redirect, Route, Switch } from '@staff-portal/navigation'

interface Props {
  children: ReactNode
}

const URL_REWRITE_REGEX = /\/\/+/g

const RouteUrlSanitizer = ({ children }: Props) => (
  <Switch>
    <Route path='*'>
      {({ location: { pathname, search, hash } }) => {
        if (pathname.match(URL_REWRITE_REGEX)) {
          const cleanPath = pathname.replace(URL_REWRITE_REGEX, '/')

          return <Redirect to={`${cleanPath}${search}${hash}`} />
        }

        return children
      }}
    </Route>
  </Switch>
)

export default RouteUrlSanitizer
