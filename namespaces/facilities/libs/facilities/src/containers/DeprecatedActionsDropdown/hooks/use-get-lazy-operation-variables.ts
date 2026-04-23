import {
  OperationFragment,
  GetLazyOperationVariables
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { DropdownActionType } from '../utils'

type Operations = Record<string, OperationFragment>

export const useGetLazyOperationVariables =
  ({
    operations,
    nodeId,
    nodeType
  }: {
    operations: Operations
    nodeType: NodeType
    nodeId: string
  }) =>
  (operationName: keyof Operations) => ({
    type: DropdownActionType.LAZY_OPERATION,
    operation: operations[operationName],
    operationVariables: {
      nodeId,
      nodeType,
      operationName
    } as GetLazyOperationVariables
  })
