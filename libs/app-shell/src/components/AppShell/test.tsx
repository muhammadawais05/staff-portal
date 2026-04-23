import { render, screen } from '@testing-library/react'
import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'
import React, { ReactNode } from 'react'

import AppShell from './index'

const ENVIRONMENT: EnvironmentTypes = 'development'

jest.mock('styled-components', () => ({
  __esModule: true,
  StyleSheetManager: ({
    children,
    useMultipleStyles
  }: Record<string, boolean | ReactNode>) => (
    <div data-testid='StyleSheetManager'>
      {children}
      <div data-testid='StyleSheetManager--useMultipleStyles'>
        {JSON.stringify(useMultipleStyles)}
      </div>
    </div>
  )
}))
jest.mock('@toptal/picasso-provider', () => ({
  __esModule: true,
  default: ({
    children,
    responsive,
    titleCase,
    environment
  }: Record<string, boolean | string>) => (
    <div data-testid='Picasso'>
      {children}
      <div data-testid='Picasso--titleCase'>{JSON.stringify(titleCase)}</div>
      <div data-testid='Picasso--responsive'>{JSON.stringify(responsive)}</div>
      <div data-testid='Picasso--environment'>{environment}</div>
    </div>
  )
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  __esModule: true,
  ApolloProvider: (props: Record<string, boolean | ReactNode>) => {
    const { children, ...rest } = props

    return (
      <div data-testid='ApolloProvider'>
        {children}
        <div data-testid='ApolloProvider--config'>{JSON.stringify(rest)}</div>
      </div>
    )
  }
}))
jest.mock('@staff-portal/error-handling', () => ({
  __esModule: true,
  ApplicationErrorBoundary: (props: Record<string, boolean | ReactNode>) => {
    const { children, ...rest } = props

    return (
      <div data-testid='ApplicationErrorBoundary'>
        {children}
        <div data-testid='ApplicationErrorBoundary--config'>
          {JSON.stringify(rest)}
        </div>
      </div>
    )
  }
}))

const appConfig = {
  dataLayer: {
    endpoints: {
      platformUrl: 'PLATFORM_API_URL',
      kipperUrl: 'KIPPER_API_URL'
    },
    config: {}
  },
  errorBoundary: {
    appName: 'staff-portal',
    packageVersion: '0.0',
    environment: ENVIRONMENT,
    productName: 'staff-portal'
  },
  picasso: {
    responsive: false,
    environment: ENVIRONMENT,
    titleCase: true
  }
}

describe('AppShell', () => {
  beforeEach(() => {
    render(
      <AppShell config={appConfig}>
        <div data-testid='testChildren' />
      </AppShell>
    )
  })

  it('renders children', () => {
    expect(screen.getByTestId('testChildren')).toBeInTheDocument()
  })

  it('renders `StyleSheetManager`', () => {
    expect(screen.getByTestId('StyleSheetManager')).toBeInTheDocument()
    expect(
      screen.getByTestId('StyleSheetManager--useMultipleStyles')
    ).toHaveTextContent('true')
  })

  it('renders `Picasso`', () => {
    expect(screen.getByTestId('Picasso')).toBeInTheDocument()
    expect(screen.getByTestId('Picasso--titleCase')).toHaveTextContent('true')
    expect(screen.getByTestId('Picasso--responsive')).toHaveTextContent('false')
    expect(screen.getByTestId('Picasso--environment')).toHaveTextContent(
      'development'
    )
  })

  it('renders `ApolloProvider`', () => {
    expect(screen.getByTestId('ApolloProvider')).toBeInTheDocument()
    expect(screen.getByTestId('ApolloProvider--config')).toHaveTextContent(
      '{"endpoints":{"platformUrl":"PLATFORM_API_URL","kipperUrl":"KIPPER_API_URL"},"config":{}}'
    )
  })
})
