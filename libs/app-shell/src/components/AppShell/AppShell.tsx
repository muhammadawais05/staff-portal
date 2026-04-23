import React, { ComponentProps, ReactNode } from 'react'
import Picasso from '@toptal/picasso-provider'
import { StyleSheetManager } from 'styled-components'
import { ApolloProvider } from '@staff-portal/data-layer-service'
import { ApplicationErrorBoundary } from '@staff-portal/error-handling'
import {
  DependencyInjector,
  DependenciesRegistry
} from '@staff-portal/dependency-injector'

// TODO: remove when https://github.com/styled-components/styled-components/pull/3477
//  is merged to styled-components and new typings become available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SheetManager = StyleSheetManager as any

interface AppShellConfig {
  picasso?: ComponentProps<typeof Picasso>
  dataLayer: ComponentProps<typeof ApolloProvider>
  errorBoundary: Pick<
    ComponentProps<typeof ApplicationErrorBoundary>,
    'environment' | 'appName' | 'packageVersion' | 'productName'
  >
}

interface Props {
  config: AppShellConfig
  children?: ReactNode
  dependenciesRegistry?: DependenciesRegistry
}

const AppShell = ({ children, config, dependenciesRegistry }: Props) => {
  return (
    <SheetManager useMultipleStyles>
      <Picasso {...config.picasso}>
        <ApplicationErrorBoundary {...config.errorBoundary}>
          <ApolloProvider {...config.dataLayer}>
            <DependencyInjector registry={dependenciesRegistry}>
              {children}
            </DependencyInjector>
          </ApolloProvider>
        </ApplicationErrorBoundary>
      </Picasso>
    </SheetManager>
  )
}

export default AppShell
