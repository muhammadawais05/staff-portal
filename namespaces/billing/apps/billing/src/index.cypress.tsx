import 'regenerator-runtime/runtime.js'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { RouteContext } from '@topkit/router'
import Picasso from '@toptal/picasso-provider'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { useDependenciesRegistry as createDependenciesRegistry } from '@staff-portal/dependency-injector'
import { AppShell } from '@staff-portal/app-shell'
import { localStorageService } from '@staff-portal/local-storage-service'
import { BrowserRouter, Route } from 'react-router-dom'
import { lazy } from '@staff-portal/utils'
import * as Config from '@staff-portal/billing/src/config/_helper/config'
import WidgetWrapper from '@staff-portal/billing/src/_lib/developerTools/WidgetWrapper'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { identicalPath } from '@staff-portal/billing/src/utils/tests'
import { BILLING_MODALS_PATH_MAP } from '@staff-portal/billing/src/dependencies'
import { BillingWidgetsModalsPathsMap } from '@staff-portal/billing-widgets/src/modals'
import { applicationErrorHandlers } from '@staff-portal/data-layer-service'
import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'

import { BillingAppModalsPathsMap } from './billing-modals'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

const RelatedTasks = () =>
  `RELATED TASKS MOCK (yes, it's fine to have it in dev env)`
const TimelineButton = () =>
  `TIMELINE BUTTON MOCK (yes, it's fine to have it in dev env)`

const dependenciesRegistry = createDependenciesRegistry()

dependenciesRegistry.set(BILLING_MODALS_PATH_MAP, {
  ...BillingWidgetsModalsPathsMap,
  ...BillingAppModalsPathsMap
})

const notificationContainer = document.getElementById(
  'react_notification'
) as HTMLElement

const appShellConfig = {
  dataLayer: {
    endpoints: {
      platformUrl: Config.DAVINCI_API_GATEWAY_URL,
      kipperUrl: Config.DAVINCI_KIPPER_API_URL
    },
    config: {
      connectToDevTools: Config.ENVIRONMENT !== 'production',
      cucumberMode: Config.DAVINCI_CUCUMBER_MODE,
      isEnd2EndTestMode: false,
      errorHandlers: applicationErrorHandlers({
        appName: Config.APP_NAME,
        packageVersion: Config.PACKAGE_VERSION
      }),
      isIntegrationTestMode: Config.CYPRESS_MODE
    }
  },
  errorBoundary: {
    appName: Config.APP_NAME,
    environment: Config.ENVIRONMENT as EnvironmentTypes,
    packageVersion: Config.PACKAGE_VERSION,
    productName: 'Platform'
  },
  picasso: {
    fixViewport: false,
    loadFavicon: false,
    notificationContainer,
    reset: false,
    responsive: false,
    titleCase: true
  }
}

const appProps: BaseAppProps = {
  role: window.DATA_ROLE,
  currentUser: window.DATA_CURRENT_USER,
  endpoints: {
    Gateway: Config.DAVINCI_API_GATEWAY_URL || 'cypress.subbed.fetch/gateway',
    Platform:
      Config.DAVINCI_PLATFORM_API_URL || 'cypress.subbed.fetch/platform',
    Kipper: 'cypress.stubbed.fetch/kipper'
  },
  modalContainer: document.getElementById('react_modal') as HTMLElement,
  notificationContainer
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseProps: BaseAppProps & Record<string, any> = {
  ...appProps,
  baseAppProps: appProps,
  engagementGid: window.DATA_ENGAGEMENT_GID,
  engagementId: window.DATA_ENGAGEMENT_ID,
  featureFlags: window.DATA_FEATURE_FLAGS,
  invoiceId: window.DATA_INVOICE_ID,
  clientId: window.DATA_CLIENT_ID,
  modalsOnly: window.DATA_MODALS_ONLY,
  paymentId: window.DATA_PAYMENT_ID,
  purchaseOrderId: window.DATA_PURCHASE_ORDER_ID,
  task: window.DATA_TASK,
  taskCardConfig: window.DATA_TASK_CARD,
  RelatedTasks,
  TimelineButton
}

if (window.DATA_WIDGET) {
  localStorageService.setItem('cypressWidget', window.DATA_WIDGET)
}

const cypressWidget = localStorageService.getItem<string>('cypressWidget')

const isSharedWidget =
  cypressWidget &&
  [
    'StaffEngagementPage',
    'StaffConsolidationDefaultsPage',
    'StaffCommissionWidget',
    'StaffBillingDetailsWidget',
    'StaffOverviewPage',
    'StaffBasicBillingInfoWidget',
    'StaffInvoiceTaskCard'
  ].includes(cypressWidget)

const SelectedComponent = cypressWidget
  ? isSharedWidget
    ? lazy(
        () =>
          import(`@staff-portal/billing-widgets/src/widget/${cypressWidget}`)
      )
    : lazy(() => import(`./widget/${cypressWidget}`))
  : null

ReactDOM.render(
  <Picasso responsive={false} titleCase environment='development'>
    <MessagesProvider>
      <RouteContext.Provider value={identicalPath}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <WidgetWrapper>
              <AppShell
                config={appShellConfig}
                dependenciesRegistry={dependenciesRegistry}
              >
                <Route path='/:id'>
                  {() =>
                    SelectedComponent ? (
                      <SelectedComponent {...baseProps} />
                    ) : (
                      "Can't load the component"
                    )
                  }
                </Route>
              </AppShell>
            </WidgetWrapper>
          </Suspense>
        </BrowserRouter>
      </RouteContext.Provider>
    </MessagesProvider>
  </Picasso>,
  document.getElementById('root')
)
