import {
  GetLazyOperationVariables,
  OperationFragment
} from '@staff-portal/operations'

export type ActionItemKey = string
export type ActionItemLabel = string
export type ActionItemUrl = string
export type ActionItemAction = () => void

export type ActionItemBase = {
  // key is required only if there are two labels with a same value,
  // in any other case you can skip its usage
  key?: ActionItemKey
  label: ActionItemLabel
  visible?: boolean | null
  disabled?: boolean
  disabledText?: string
}

export type ActionItemInDevelopment = ActionItemBase & {
  type?: undefined
}

export type ActionItemStatic = ActionItemBase & {
  type: DropdownActionType.STATIC
  action: ActionItemAction
}
export type ActionItemLink = ActionItemBase & {
  type: DropdownActionType.LINK
  url?: ActionItemUrl | null
  newWindow?: boolean
}
export type ActionItemOperation = ActionItemBase & {
  type: DropdownActionType.OPERATION
  operation?: OperationFragment
  action: ActionItemAction
}
export type ActionItemLazyOperation = ActionItemBase & {
  type: DropdownActionType.LAZY_OPERATION
  operation?: OperationFragment
  operationVariables: GetLazyOperationVariables
  action: ActionItemAction
}

export type ActionItem =
  | ActionItemInDevelopment
  | ActionItemStatic
  | ActionItemLink
  | ActionItemOperation
  | ActionItemLazyOperation

export type ActionsList = ActionItem[]

export enum DropdownActionType {
  STATIC = 'STATIC',
  LINK = 'LINK',
  OPERATION = 'OPERATION',
  LAZY_OPERATION = 'LAZY_OPERATION'
}
