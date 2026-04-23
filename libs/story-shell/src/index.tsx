import React, { FC } from 'react'
import {
  RouteContext,
  BrowserRouter,
  MemoryRouter,
  Route,
  generatePath,
  QueryStringParams
} from '@staff-portal/navigation'
import { AppShell } from '@staff-portal/app-shell'
import { ModalProvider, useModalRegistry } from '@staff-portal/modals-service'
import { Form, FormConfigProps } from '@toptal/picasso-forms'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { applicationErrorHandlers } from '@staff-portal/data-layer-service'
import {
  APP_NAME,
  ENVIRONMENT,
  PLATFORM_API_URL,
  KIPPER_API_URL,
  PACKAGE_VERSION,
  PRODUCT_NAME
} from '@staff-portal/config'
import { createGlobalStyle } from 'styled-components'
import { generateRoutePath } from '@staff-portal/routes'

interface Props {
  render: FC
  params?: NonNullable<Parameters<typeof generatePath>[1]>
  queryParams?: QueryStringParams
}

const GlobalStyle = createGlobalStyle`
  #root {
    max-width: 100%;

    > div {
      max-width: 100%;
    }
  }
`

const FORM_CONFIG_PROPS: FormConfigProps = {
  validateOnSubmit: true,
  requiredVariant: 'asterisk'
}

const STAFF_PORTAL_BACKGROUND_COLOR = '#fcfcfc'

const styles = `
  margin: -1rem;
  padding: 0 2rem;
  background-color: ${STAFF_PORTAL_BACKGROUND_COLOR};
  overflow: auto;
`

const identicalPath = (path: string) => ({ url: path })

const appConfig = {
  dataLayer: {
    endpoints: {
      platformUrl: PLATFORM_API_URL,
      kipperUrl: KIPPER_API_URL
    },
    config: {
      errorHandlers: applicationErrorHandlers({
        appName: APP_NAME,
        packageVersion: PACKAGE_VERSION
      }),
      connectToDevTools: true,
      isEnd2EndTestMode: false,
      isIntegrationTestMode: false,
      isDevelopmentMode: true
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
    environment: 'development' as const,
    titleCase: true
  },
  appUpdateChecker: {
    isEnabled: false
  }
}

export type Story<Args = {}> = FC<Args> & { args?: Args }

export const StoryShell = ({
  render: Component,
  params,
  queryParams
}: Props) => {
  const modalRegistry = useModalRegistry()

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
          <AppShell config={appConfig}>
            <MessagesProvider>
              <Form.ConfigProvider value={FORM_CONFIG_PROPS}>
                <GlobalStyle />
                <ModalProvider registry={modalRegistry}>
                  <div css={styles}>
                    <Component />
                  </div>
                </ModalProvider>
              </Form.ConfigProvider>
            </MessagesProvider>
          </AppShell>
        </Route>
      </Router>
    </RouteContext.Provider>
  )
}

export default StoryShell
