import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { OperationFragment } from './operation-fragment.staff.gql.types'

export const createOperationMock = (
  fields?: Partial<OperationFragment>
): OperationFragment & {
  __typename: string
} => ({
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  ...fields,
  __typename: 'Operation'
})
