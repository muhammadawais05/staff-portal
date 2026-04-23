import React, { FC } from 'react'
import { STAFF_PORTAL_BACKGROUND_COLOR } from '@staff-portal/ui'
import { applicationErrorHandlers } from '@staff-portal/data-layer-service'
import {
  RouteContext,
  BrowserRouter,
  MemoryRouter,
  Route,
  generatePath,
  QueryStringParams
} from '@staff-portal/navigation'
import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'
import { AppShell } from '@staff-portal/app-shell'
import { DependenciesRegistry } from '@staff-portal/dependency-injector'
import { generateRoutePath } from '@staff-portal/routes'

import { BaseAppProps } from './@types/types'
import { identicalPath } from './utils/tests'
import * as Config from './config/_helper/config'
import fixtures from './_fixtures'

const currentUser = fixtures.MockUsers.getByRole().staffUser

const appProps = {
  endpoints: {
    Gateway: Config.DAVINCI_API_GATEWAY_URL,
    Platform: Config.DAVINCI_PLATFORM_API_URL,
    Kipper: Config.DAVINCI_KIPPER_API_URL
  },
  currentUser,
  locale: 'en-US',
  role: currentUser.ROLE
}

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
    reset: false,
    responsive: false,
    titleCase: true
  }
}

interface Props {
  render: FC<BaseAppProps>
  dependenciesRegistry: DependenciesRegistry
  params?: NonNullable<Parameters<typeof generatePath>[1]>
  queryParams?: QueryStringParams
}

const styles = `
  margin: -1rem;
  padding: 0 2rem;
  background-color: ${STAFF_PORTAL_BACKGROUND_COLOR};
  overflow: auto;
`

export const StoryShell = ({
  render: Component,
  params,
  queryParams,
  dependenciesRegistry
}: Props) => {
  const fakeRoute = params
    ? Object.keys(params)
        .map(paramName => `/:${paramName}`)
        .join('')
    : queryParams
    ? ''
    : undefined

  const fakePath =
    fakeRoute !== undefined
      ? generateRoutePath(fakeRoute, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parameters: params as any,
          searchParams: queryParams
        })
      : undefined

  const Router: typeof MemoryRouter = fakePath ? MemoryRouter : BrowserRouter

  return (
    <RouteContext.Provider value={identicalPath}>
      <Router key={fakePath} initialEntries={fakePath ? [fakePath] : undefined}>
        <Route path={fakeRoute}>
          <div css={styles}>
            <AppShell
              config={appShellConfig}
              dependenciesRegistry={dependenciesRegistry}
            >
              <Component {...appProps} />
            </AppShell>
          </div>
        </Route>
      </Router>
    </RouteContext.Provider>
  )
}

export default StoryShell
