import React from 'react'
import { EnvironmentBanner } from '@toptal/picasso'
import { Form, FormConfigProps } from '@toptal/picasso-forms'
import { hot } from 'react-hot-loader/root'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { BrowserRouter, RouteContext } from '@staff-portal/navigation'
import {
  APP_NAME,
  CUCUMBER_MODE,
  ENVIRONMENT,
  KIPPER_API_URL,
  PACKAGE_VERSION,
  PERFORMANCE_MONITORING_IS_ENABLED,
  PLATFORM_API_URL,
  PRODUCT_NAME,
  CYPRESS_MODE
} from '@staff-portal/config'
import { ModalProvider, useModalRegistry } from '@staff-portal/modals-service'
import { useDependenciesRegistry } from '@staff-portal/dependency-injector'
import { PerformanceCollector } from '@staff-portal/monitoring-service'
import { applicationErrorHandlers } from '@staff-portal/data-layer-service'
import { AppShell } from '@staff-portal/app-shell'
import { ScrollToTop } from '@staff-portal/ui'
import { PendoGuidesProvider } from '@staff-portal/pendo-guides'
import { MultiProvider } from '@staff-portal/utils'
import { createNewEngagementWizardGraphqlErrorHandler } from '@staff-portal/engagements-app'

import { Chrome } from './components'
import * as S from './styles'
import { useDependencies } from './hooks/use-dependencies'
import { useModals } from './hooks/use-modals'
import Routes from './components/Routes'
import getAppRoutes from './utils/get-app-routes'
import route from './utils/route'

const FORM_CONFIG_PROPS: FormConfigProps = {
  validateOnSubmit: true,
  requiredVariant: 'asterisk'
}

const appConfig = {
  dataLayer: {
    endpoints: {
      platformUrl: PLATFORM_API_URL,
      kipperUrl: KIPPER_API_URL
    },
    config: {
      errorHandlers: [
        ...applicationErrorHandlers({
          appName: APP_NAME,
          packageVersion: PACKAGE_VERSION
        }),
        createNewEngagementWizardGraphqlErrorHandler()
      ],
      connectToDevTools: ENVIRONMENT !== 'production',
      isEnd2EndTestMode: CUCUMBER_MODE,
      isIntegrationTestMode: CYPRESS_MODE,
      isDevelopmentMode: ENVIRONMENT === 'development'
    }
  },
  errorBoundary: {
    appName: APP_NAME,
    packageVersion: PACKAGE_VERSION,
    environment: ENVIRONMENT,
    productName: PRODUCT_NAME
  },
  picasso: {
    responsive: false,
    environment: ENVIRONMENT,
    titleCase: true
  }
}

const App = () => {
  const depsRegistry = useDependenciesRegistry()
  const appRoutes = getAppRoutes()
  const modalRegistry = useModalRegistry()

  useModals(modalRegistry)
  useDependencies(depsRegistry)

  return (
    <MultiProvider
      providers={[
        <BrowserRouter />,
        <AppShell config={appConfig} dependenciesRegistry={depsRegistry} />,
        <MessagesProvider />,
        <Form.ConfigProvider value={FORM_CONFIG_PROPS} />,
        <PendoGuidesProvider />,
        <PerformanceCollector
          id='application'
          title='Routes'
          shouldTrackData={PERFORMANCE_MONITORING_IS_ENABLED}
        />,
        <RouteContext.Provider value={route(appRoutes)} />,
        <ModalProvider registry={modalRegistry} />
      ]}
    >
      <EnvironmentBanner environment={ENVIRONMENT} productName={PRODUCT_NAME} />
      <S.GlobalStyle />
      <ScrollToTop />
      <Chrome>
        <Routes routes={appRoutes} />
      </Chrome>
    </MultiProvider>
  )
}

export default hot(App)
