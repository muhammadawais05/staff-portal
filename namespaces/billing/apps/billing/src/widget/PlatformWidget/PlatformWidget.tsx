import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RouteContext, Route } from '@topkit/router'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import {
  DependenciesRegistry,
  useDependenciesRegistry
} from '@staff-portal/dependency-injector'
import { BILLING_MODALS_PATH_MAP } from '@staff-portal/billing/src/dependencies'
import { BillingWidgetsModalsPathsMap } from '@staff-portal/billing-widgets/src/modals'

import { BillingAppModalsPathsMap } from '../../billing-modals'

export const routeHandler: Route = path => ({
  url: path
})

type PlatformWidgetComponent = FC<{
  dependenciesRegistry?: DependenciesRegistry
}>

const PlatformWidget = ({
  render: Component
}: {
  render: PlatformWidgetComponent
}) => {
  const dependenciesRegistry = useDependenciesRegistry()

  dependenciesRegistry.set(BILLING_MODALS_PATH_MAP, {
    ...BillingWidgetsModalsPathsMap,
    ...BillingAppModalsPathsMap
  })

  return (
    <MessagesProvider>
      <RouteContext.Provider value={routeHandler}>
        <BrowserRouter>
          <Component dependenciesRegistry={dependenciesRegistry} />
        </BrowserRouter>
      </RouteContext.Provider>
    </MessagesProvider>
  )
}

export default PlatformWidget
