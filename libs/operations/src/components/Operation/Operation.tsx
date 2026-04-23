import { TooltipProps } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { Operation as GQLOperation, Maybe } from '@staff-portal/graphql/staff'

import { isOperationDisabled } from '../../utils'
import OperationWrapper from '../OperationWrapper'

export interface OperationProps {
  operation?: Maybe<GQLOperation>
  hidden?: boolean
  inline?: boolean
  tooltipDelay?: TooltipProps['delay']
  disableTooltip?: boolean
  render?: (disabled: boolean) => ReactNode
  children?: ReactNode
}

// TODO: rename this component to not conflict with Operation type
//  and to make it clearer what it does https://toptal-core.atlassian.net/browse/SP-1826
const Operation = ({
  operation,
  hidden = false,
  inline,
  tooltipDelay,
  disableTooltip = false,
  render,
  children
}: OperationProps) => {
  return (
    <OperationWrapper
      operation={operation}
      hidden={hidden}
      inline={inline}
      disableTooltip={disableTooltip}
      tooltipDelay={tooltipDelay}
    >
      {render ? render(isOperationDisabled(operation)) : children}
    </OperationWrapper>
  )
}

export default Operation
