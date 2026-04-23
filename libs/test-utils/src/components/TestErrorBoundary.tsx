import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  errorMessage: string
}

interface State {
  hasError: boolean
}

class TestErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentWillUnmount() {
    this.setHasError(false)
  }

  private setHasError(value: boolean) {
    this.setState({ hasError: value })
  }

  componentDidCatch() {
    this.setHasError(true)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return <p>{this.props.errorMessage}</p>
  }
}

export default TestErrorBoundary
