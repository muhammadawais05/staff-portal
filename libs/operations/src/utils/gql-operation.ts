import {
  Operation,
  OperationCallableTypes,
  Maybe
} from '@staff-portal/graphql/staff'

type PartialOperation = Pick<Operation, 'callable'>

export const isOperationEnabled = (operation?: Maybe<PartialOperation>) =>
  operation?.callable === OperationCallableTypes.ENABLED

export const isOperationDisabled = (operation?: Maybe<PartialOperation>) =>
  operation?.callable === OperationCallableTypes.DISABLED

export const isOperationHidden = (operation?: Maybe<PartialOperation>) =>
  !operation || operation?.callable === OperationCallableTypes.HIDDEN
