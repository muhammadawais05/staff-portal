import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

declare function F(
  callable: OperationCallableTypes.DISABLED,
  messages: string[]
): Operation
declare function F(
  callable: OperationCallableTypes.ENABLED | OperationCallableTypes.HIDDEN
): Operation

const constructOperation: typeof F = (
  callable: OperationCallableTypes,
  messages: string[] | never[] = []
) => ({
  callable,
  messages
})

export { constructOperation }
