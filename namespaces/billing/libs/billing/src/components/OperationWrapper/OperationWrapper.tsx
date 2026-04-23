import { Tooltip, Container, TooltipProps } from '@toptal/picasso'
import React, { ReactNode, Children, isValidElement, cloneElement } from 'react'
import { lowerCase } from 'lodash-es'
import { Link } from '@topkit/react-router'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import {
  isCallableHidden,
  isCallableEnabled,
  getOperationMessage,
  isCallableDisabled
} from '../../_lib/helpers/operations'
import { OperationItemFragment } from '../../__fragments__/operationItemFragment.graphql.types'

const displayName = 'OperationWrapper'

interface Props {
  children: ReactNode
  enabledText?: string
  disabledText?: string
  isLoading?: boolean
  operation?: OperationItemFragment
  placement?: TooltipProps['placement']
}

const OperationWrapper = ({
  children,
  enabledText,
  disabledText,
  isLoading = false,
  operation = {
    messages: [],
    callable: OperationCallableTypes.HIDDEN
  },
  placement = 'top'
}: Props) => {
  const { callable, messages } = operation

  if (!callable || isCallableHidden(callable)) {
    return null
  }

  const isOperationEnabled = isCallableEnabled(callable)
  const isOperationDisabled = isCallableDisabled(callable)
  const operationJoinedMessages = getOperationMessage(messages)
  const tooltipContent =
    (isOperationEnabled && enabledText) ||
    (isOperationDisabled && disabledText) ||
    operationJoinedMessages

  const childrenWithExtendedProps = Children.map(children, child => {
    if (
      isValidElement(child) &&
      // @ts-expect-error type bad typing, its an object
      lowerCase(child.type?.displayName).includes('button')
    ) {
      if (isOperationEnabled && !isLoading) {
        if (child.props.href) {
          return cloneElement(child, { as: Link })
        }

        return child
      }

      return cloneElement(child, {
        disabled: true,
        as: 'span',
        loading: isLoading
      })
    }
  })

  if (tooltipContent) {
    return (
      <Tooltip placement={placement} content={tooltipContent} interactive>
        <Container inline>{childrenWithExtendedProps}</Container>
      </Tooltip>
    )
  }

  return <>{childrenWithExtendedProps}</>
}

OperationWrapper.displayName = displayName

export default OperationWrapper
