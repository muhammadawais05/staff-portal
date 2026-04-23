import React, { ReactNode } from 'react'
import Picasso from '@toptal/picasso-provider'
import { PLATFORM_API_URL } from '@staff-portal/config'
import { ApolloProvider } from '@staff-portal/data-layer-service'

export const withApollo = (children: ReactNode) => (
  <ApolloProvider
    endpoints={{
      platformUrl: PLATFORM_API_URL,
      kipperUrl: ''
    }}
    config={{ connectToDevTools: true }}
  >
    {children}
  </ApolloProvider>
)

export const withPicasso = (children: ReactNode) => (
  <Picasso>{children}</Picasso>
)

export const wrapComponent = (component: ReactNode) =>
  withPicasso(withApollo(component))
