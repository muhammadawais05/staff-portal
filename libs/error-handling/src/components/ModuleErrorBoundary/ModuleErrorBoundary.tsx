import React, { Component, ReactNode, ErrorInfo } from 'react'
import { withRouter, RouteComponentProps } from '@staff-portal/navigation'
import { APP_NAME, PACKAGE_VERSION } from '@staff-portal/config'
import { reportComponentError } from '@staff-portal/monitoring-service'
import { ApolloError } from '@staff-portal/data-layer-service'

import ErrorView, { ErrorType } from '../ErrorView'
import {
  isAuthorizationError,
  isInternalServerError,
  isNotFoundError
} from '../../utils'

interface Props extends RouteComponentProps {
  children: ReactNode
}

interface State {
  hasError: boolean
  errorType?: ErrorType
}

const errorTypeMap: [(error: Error | ApolloError) => boolean, ErrorType][] = [
  [isAuthorizationError, ErrorType.FORBIDDEN],
  [isInternalServerError, ErrorType.INTERNAL_SERVER_ERROR],
  [isNotFoundError, ErrorType.NOT_FOUND]
]

const getErrorType = (error: Error | ApolloError) =>
  errorTypeMap.find(([check]) => check(error))?.[1]

class ModuleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error | ApolloError) {
    const errorType = getErrorType(error)

    return { hasError: true, errorType }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.location !== this.props.location) {
      this.setState({ hasError: false })
    }
  }

  componentDidCatch(error: Error | ApolloError, errorInfo: ErrorInfo) {
    if (!(error instanceof ApolloError)) {
      reportComponentError(error, errorInfo, { APP_NAME, PACKAGE_VERSION })
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return <ErrorView errorType={this.state.errorType} />
  }
}

export default withRouter(ModuleErrorBoundary)
