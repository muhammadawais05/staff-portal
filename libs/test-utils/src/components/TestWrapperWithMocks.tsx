import React from 'react'
import {
  MockedProvider,
  createApolloClientCache,
  MockedProviderProps,
  createApolloClientResolvers
} from '@staff-portal/data-layer-service'

import { TestWrapper } from '.'

interface TestWrapperWithMocksProps extends MockedProviderProps {
  useCache?: boolean
}

const TestWrapperWithMocks = ({
  mocks,
  useCache = true,
  addTypename = true,
  defaultOptions,
  children
}: TestWrapperWithMocksProps) => {
  return <MockedProvider
    mocks={mocks}
    cache={useCache ? createApolloClientCache() : undefined}
    resolvers={createApolloClientResolvers()}
    addTypename={addTypename}
    defaultOptions={defaultOptions}
  >
    <TestWrapper>{children}</TestWrapper>
  </MockedProvider>
}

export default TestWrapperWithMocks
