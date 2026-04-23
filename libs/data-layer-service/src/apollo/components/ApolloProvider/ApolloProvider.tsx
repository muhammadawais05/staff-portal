import { ApolloProvider as ExternalApolloProvider } from '@apollo/client'
import React, { useMemo, ReactNode } from 'react'

import { createApolloClient, CreateApolloClientSettings } from '../../utils'

interface Props extends CreateApolloClientSettings {
  children?: ReactNode
}

const ApolloProvider = ({ children, ...apolloClientProps }: Props) => {
  const client = useMemo(() => createApolloClient(apolloClientProps), [
    apolloClientProps
  ])

  return (
    <ExternalApolloProvider client={client}>{children}</ExternalApolloProvider>
  )
}

export default ApolloProvider
