import { I18nextProvider } from 'react-i18next'
import { Settings } from 'luxon'
import React, { FC, memo } from 'react'
import { noop } from '@toptal/picasso/utils'
import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'
import { AppShell } from '@staff-portal/app-shell'
import { PersistentFormProvider } from '@staff-portal/forms'
import { applicationErrorHandlers } from '@staff-portal/data-layer-service'

import { BaseAppProps, UserRole } from '../../@types/types'
import { ExternalIntegratorContext } from '../../_lib/context/externalIntegratorContext'
import { StoreProvider } from '../../store'
import { UserContext } from '../../_lib/context/userContext'
import AnalyticsTracker from '../AnalyticsTracker'
import ExternalIntegrator from '../ExternalIntegrator'
import FeatureFlagsContainer from '../FeatureFlagsContainer'
import i18n from '../../utils/i18n'
import * as Config from '../../config/_helper/config'

const displayName = 'App'
const DEBOUNCE_LIMIT = 500

const App: FC<BaseAppProps> = memo<BaseAppProps>(
  ({
    children,
    currentUser,
    datepickerDisplayDateFormat = 'yyyy-MM-dd',
    datepickerEditDateFormat = 'yyyy-MM-dd',
    endpoints,
    featureFlags,
    handleInboundEvent = noop,
    handleInboundEventUnsubscribe = noop,
    handleOutboundEventEmit = noop,
    isEnd2EndTestMode = false,
    renderAppShell = false,
    locale = 'en-US',
    modalContainer,
    notificationContainer,
    role = UserRole.notTalent,
    shouldInitSentry,
    throwBoundaryErrorsToHostApp,
    weekStartsOn = 1,
    dependenciesRegistry
  }) => {
    Settings.defaultZoneName = currentUser?.timeZone?.value || 'local'
    // TODO : remove type casting when currentUser will support `locale`
    //  https://toptal-core.atlassian.net/browse/FX-1477
    Settings.defaultLocale = locale as string

    const content = (
      <ExternalIntegratorContext.Provider
        value={{
          endpoints,
          handleInboundEvent,
          handleInboundEventUnsubscribe,
          handleOutboundEventEmit,
          modalContainer,
          throwBoundaryErrorsToHostApp
        }}
      >
        <UserContext.Provider
          value={{
            currentUser,
            datepickerDisplayDateFormat,
            datepickerEditDateFormat,
            locale,
            role,
            weekStartsOn
          }}
        >
          <StoreProvider>
            <ExternalIntegrator
              handleInboundEvent={handleInboundEvent}
              handleInboundEventUnsubscribe={handleInboundEventUnsubscribe}
            >
              <FeatureFlagsContainer flags={featureFlags}>
                <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
                  {children}
                </PersistentFormProvider>
              </FeatureFlagsContainer>
            </ExternalIntegrator>
          </StoreProvider>
        </UserContext.Provider>
      </ExternalIntegratorContext.Provider>
    )

    if (renderAppShell) {
      const defaultAppShellConfig = {
        dataLayer: {
          endpoints: {
            // Required for platform, build runtime not aware of the endpoint
            platformUrl: endpoints?.Gateway || Config.DAVINCI_PLATFORM_API_URL,
            // Required for platform, build runtime not aware of the endpoint
            kipperUrl: endpoints?.Kipper || Config.DAVINCI_KIPPER_API_URL
          },
          config: {
            connectToDevTools: Config.ENVIRONMENT !== 'production',
            cucumberMode: Config.DAVINCI_CUCUMBER_MODE,
            isEnd2EndTestMode,
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

      return (
        <I18nextProvider i18n={i18n}>
          <AnalyticsTracker shouldInitErrorLogging={shouldInitSentry} />
          <AppShell
            config={defaultAppShellConfig}
            dependenciesRegistry={dependenciesRegistry}
          >
            {content}
          </AppShell>
        </I18nextProvider>
      )
    }

    return <I18nextProvider i18n={i18n}>{content}</I18nextProvider>
  }
)

App.displayName = displayName

export default App
