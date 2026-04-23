import React from 'react'
import { OperationCallableTypes, Maybe } from '@staff-portal/graphql/staff'

import MultiLineTooltipContent from '../../../components/MultiLineTooltipContent'
import { OperationItemFragment } from '../../../__fragments__/operationItemFragment.graphql.types'

interface OperationHelper {
  operations?: Maybe<Record<string, OperationItemFragment | string | null>>
  key: string
}

const isOperationEnabled = ({ operations, key }: OperationHelper) => {
  return (
    (operations?.[key] as OperationItemFragment)?.callable ===
    OperationCallableTypes.ENABLED
  )
}

const isOperationDisabled = ({ operations, key }: OperationHelper) => {
  return (
    (operations?.[key] as OperationItemFragment)?.callable ===
    OperationCallableTypes.DISABLED
  )
}

const isOperationHidden = ({ operations, key }: OperationHelper) => {
  return (
    (operations?.[key] as OperationItemFragment)?.callable ===
    OperationCallableTypes.HIDDEN
  )
}

const getOperationMessage = (messages = ['']) =>
  messages.length > 1 ? (
    <MultiLineTooltipContent messages={messages} />
  ) : (
    messages[0] ?? ''
  )

type CallableArgument = OperationCallableTypes | false

const isCallableEnabled = (callable?: CallableArgument) =>
  callable === OperationCallableTypes.ENABLED

const isCallableDisabled = (callable?: CallableArgument) =>
  callable === OperationCallableTypes.DISABLED

const isCallableHidden = (callable?: CallableArgument) =>
  callable === OperationCallableTypes.HIDDEN

const isAnyOperationIsNotHidden = (
  operations?: Record<string, OperationItemFragment | string>
) => {
  if (!operations) {
    return false
  }

  return Object.entries(operations).reduce((acc, [key, operation]) => {
    if (acc || key === '__typename') {
      return acc
    }

    return !isCallableHidden((operation as OperationItemFragment)?.callable)
      ? true
      : acc
  }, false)
}

export {
  getOperationMessage,
  isCallableDisabled,
  isCallableEnabled,
  isCallableHidden,
  isOperationDisabled,
  isOperationEnabled,
  isOperationHidden,
  isAnyOperationIsNotHidden
}
