import React, { Component, ReactNode, ErrorInfo, ComponentProps } from 'react'
import { Container, Page, EnvironmentBanner } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'
import { reportComponentError } from '@staff-portal/monitoring-service'
import { ApolloError } from '@staff-portal/data-layer-service'

import { isInternalServerError } from '../../utils'
import ErrorView, { ErrorType } from '../ErrorView'

interface Props extends ComponentProps<typeof EnvironmentBanner> {
  children: ReactNode
  appName: string
  packageVersion: string
}

interface State {
  hasError: boolean
  errorType?: ErrorType
}

const errorTypeMap: [(error: Error | ApolloError) => boolean, ErrorType][] = [
  [isInternalServerError, ErrorType.INTERNAL_SERVER_ERROR]
]

const getErrorType = (error: Error | ApolloError) =>
  errorTypeMap.find(([check]) => {
    return check(error)
  })?.[1]

class ApplicationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error | ApolloError) {
    const errorType = getErrorType(error) || ErrorType.APPLICATION

    return { hasError: true, errorType }
  }

  componentDidCatch(error: Error | ApolloError, errorInfo: ErrorInfo) {
    if (!(error instanceof ApolloError)) {
      const { appName: APP_NAME, packageVersion: PACKAGE_VERSION } = this.props

      reportComponentError(error, errorInfo, { APP_NAME, PACKAGE_VERSION })
    }
  }

  render() {
    const { props, state } = this

    if (!state.hasError) {
      return props.children
    }

    return (
      <Picasso>
        <EnvironmentBanner
          environment={props.environment}
          productName={props.productName}
        />
        <Page.TopBar variant='dark' />
        <Container justifyContent='center' flex>
          <ErrorView errorType={this.state.errorType} />
        </Container>
      </Picasso>
    )
  }
}

export default ApplicationErrorBoundary
