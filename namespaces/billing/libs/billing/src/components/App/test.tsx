import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { RouteContext } from '@topkit/router'

import fixtures from '../../_fixtures'
import App from '.'

jest.mock('../../components/AnalyticsTracker')
jest.mock('react-i18next', () => ({
  I18nextProvider: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='I18nextProvider'>{children}</div>
    ))
}))
jest.mock('react-router-dom', () => ({
  BrowserRouter: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='BrowserRouter'>{children}</div>
    )),
  Route: 'exampleRoute'
}))
jest.mock('../../_lib/context/userContext', () => ({
  UserContext: {
    Provider: jest
      .fn()
      .mockImplementation(({ children }) => (
        <div data-testid='UserContextProvider'>{children}</div>
      ))
  }
}))
jest.mock('@staff-portal/forms', () => ({
  PersistentFormProvider: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='PersistentFormProvider'>{children}</div>
    )),
  applicationErrorHandlers: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  applicationErrorHandlers: jest.fn()
}))
jest.mock('@staff-portal/app-shell', () => ({
  AppShell: jest.fn().mockImplementation(({ children, config }) => (
    <>
      <div data-testid='AppShell'>{children}</div>
      <div data-testid='AppShell-config'>{JSON.stringify(config)}</div>
    </>
  ))
}))
jest.mock('../../store', () => ({
  StoreProvider: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='StoreProvider'>{children}</div>
    ))
}))
jest.mock('../../components/ExternalIntegrator')
jest.mock('../../_lib/context/externalIntegratorContext', () => ({
  ExternalIntegratorContext: {
    Provider: jest
      .fn()
      .mockImplementation(({ children }) => (
        <div data-testid='ExternalIntegratorContext'>{children}</div>
      ))
  }
}))
jest.mock('../../components/FeatureFlagsContainer')

const renderApp = (props: ComponentProps<typeof App>) =>
  render(
    <RouteContext.Provider value={(path: string) => path}>
      <App {...props} />
    </RouteContext.Provider>
  )

describe('App', () => {
  it('default render', () => {
    const { getByTestId } = renderApp({
      children: <div data-testid='test-content'>Test</div>,
      endpoints: fixtures.MockEndpoints
    })

    expect(getByTestId('I18nextProvider')).toBeInTheDocument()
    expect(getByTestId('ExternalIntegratorContext')).toBeInTheDocument()
    expect(getByTestId('UserContextProvider')).toBeInTheDocument()
    expect(getByTestId('StoreProvider')).toBeInTheDocument()
    expect(getByTestId('ExternalIntegrator')).toBeInTheDocument()
    expect(getByTestId('FeatureFlagsContainer')).toBeInTheDocument()
  })

  describe('when `renderAppShell` is `true`', () => {
    beforeEach(() => {
      renderApp({
        children: 'test',
        renderAppShell: true,
        endpoints: fixtures.MockEndpoints
      })
    })

    it('renders AppShell component', () => {
      const { getByTestId } = screen

      expect(getByTestId('AppShell')).toBeInTheDocument()
      expect(getByTestId('AppShell-config')).toHaveTextContent(
        '{"dataLayer":{"endpoints":{"platformUrl":"http://example.com/gateway","kipperUrl":"http://example.com/kipper"},"config":{"connectToDevTools":true,"cucumberMode":false,"isEnd2EndTestMode":false,"isIntegrationTestMode":true}},"errorBoundary":{"environment":"test","productName":"Platform"},"picasso":{"fixViewport":false,"loadFavicon":false,"reset":false,"responsive":false,"titleCase":true}}'
      )
    })

    it('renders AnalyticsTracker component', () => {
      const { getByTestId } = screen

      expect(getByTestId('AnalyticsTracker')).toBeInTheDocument()
    })
  })

  describe('when `shouldInitErrorLogging` is `false`', () => {
    beforeEach(() => {
      renderApp({
        children: 'test',
        renderAppShell: false,
        endpoints: fixtures.MockEndpoints
      })
    })

    it('does not render AppShell component', () => {
      const { queryByTestId } = screen

      expect(queryByTestId('AppShell')).not.toBeInTheDocument()
    })
  })
})
