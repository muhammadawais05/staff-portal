import React, { Suspense } from 'react'
import { Route, Switch } from '@staff-portal/navigation'
import { Route as RouteConfig } from '@staff-portal/routes'
import { ModuleErrorBoundary } from '@staff-portal/error-handling'
import { PageLoader } from '@staff-portal/ui'

import {
  RedirectToLegacyPage,
  RouteUrlSanitizer,
  RouteGuard,
  RouteParamSanitizer
} from './components'
import { getRouteComponent } from './utils'

type Props = {
  routes: RouteConfig[]
}

const Routes = ({ routes }: Props) => (
  <ModuleErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <RouteUrlSanitizer>
        <Switch>
          {routes.map(routeConfig => (
            <Route
              exact
              key={routeConfig.path.toString()}
              path={routeConfig.path}
            >
              <RouteParamSanitizer>
                <RouteGuard routeConfig={routeConfig}>
                  {getRouteComponent(routeConfig.path)}
                </RouteGuard>
              </RouteParamSanitizer>
            </Route>
          ))}

          <Route>
            <RedirectToLegacyPage />
          </Route>
        </Switch>
      </RouteUrlSanitizer>
    </Suspense>
  </ModuleErrorBoundary>
)

export default Routes
