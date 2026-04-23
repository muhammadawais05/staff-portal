/* eslint-disable complexity */
import { Container, TooltipProps } from '@toptal/picasso'
import React, { ReactNode, lazy, Suspense } from 'react'
import { LazyTooltip } from '@staff-portal/ui'
import { Operation as GQLOperation, Maybe } from '@staff-portal/graphql/staff'

import {
  isOperationDisabled,
  isOperationEnabled,
  isOperationHidden
} from '../../utils'

const OperationTooltipContent = lazy(() => import('../OperationTooltipContent'))

export interface OperationWrapperProps {
  operation?: Maybe<GQLOperation>
  hidden?: boolean
  inline?: boolean
  tooltipDelay?: TooltipProps['delay']
  disableTooltip?: TooltipProps['disableListeners']
  /** Tooltip message on enabled state. Overrides operations.messages */
  tooltipTextOnEnabled?: string
  /** Tooltip message on disabled state. Overrides operations.messages */
  tooltipTextOnDisabled?: string
  children?: ReactNode
}

const OperationWrapper = ({
  operation,
  hidden,
  tooltipDelay,
  inline = true,
  disableTooltip = false,
  children,
  tooltipTextOnEnabled,
  tooltipTextOnDisabled
}: OperationWrapperProps) => {
  if (hidden || !operation || isOperationHidden(operation)) {
    return null
  }

  const { messages } = operation

  const tooltipContent =
    (isOperationEnabled(operation) && tooltipTextOnEnabled) ||
    (isOperationDisabled(operation) && tooltipTextOnDisabled) ||
    (messages.length && (
      <Suspense fallback={null}>
        <OperationTooltipContent messages={messages} />
      </Suspense>
    ))

  if (disableTooltip || !tooltipContent) {
    return <>{children}</>
  }

  const as = inline ? 'span' : 'div'

  return (
    <LazyTooltip delay={tooltipDelay} content={tooltipContent} interactive>
      <Container as={as} inline={inline}>
        {children}
      </Container>
    </LazyTooltip>
  )
}

export default OperationWrapper
