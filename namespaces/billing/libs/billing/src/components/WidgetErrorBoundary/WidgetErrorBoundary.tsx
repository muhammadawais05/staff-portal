import React, { Component, ReactElement, ReactNode } from 'react'

import ErrorView from '../ErrorMessage/ErrorMessage'

interface Props {
  /**
   * shortcut , same as errorComponent={<></>}
   */
  emptyOnError?: boolean
  /**
   * component will be shown on error instead of content
   */
  errorComponent?: ReactElement
  /**
   * re-throw error to the top if caught some
   */
  bubbleUpError?: boolean
  /**
   * inner content while no errors
   */
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * TODO: migrate this component to staff-portal and use it from there
 */
export default class WidgetErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  get isThrowingErrorEnabled() {
    return !!this.props.bubbleUpError
  }

  componentDidCatch(error: Error) {
    if (this.isThrowingErrorEnabled) {
      throw error
    }

    // will force re-render
    this.setState({
      hasError: true
    })
  }

  render() {
    const {
      state: { hasError },
      props: { children, errorComponent, emptyOnError }
    } = this

    return hasError ? (
      emptyOnError ? (
        <></>
      ) : (
        errorComponent || <ErrorView />
      )
    ) : (
      children
    )
  }
}
