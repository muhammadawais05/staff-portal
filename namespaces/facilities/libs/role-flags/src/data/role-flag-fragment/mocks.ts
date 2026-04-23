import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { RoleFlagFragment } from './role-flag-fragment.staff.gql.types'

export const DEFAULT_FLAG_ATTRIBUTES = {
  id: 'abc123',
  title: 'Flag title',
  color: null,
  __typename: 'Flag'
}

export const createRoleFlagMock = (
  fields?: Partial<RoleFlagFragment>
): RoleFlagFragment & {
  __typename: string
  flag: { __typename?: string }
} => ({
  id: `flag-${Math.random().toString(36)}`,
  comment: 'test comment',
  flaggedBy: null,
  createdAt: '2018-11-04T17:30:00.000+03:00',
  updatedAt: '2018-11-04T17:30:00.000+03:00',
  flag: DEFAULT_FLAG_ATTRIBUTES,
  operations: {
    updateRoleFlag: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeRoleFlag: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  __typename: 'RoleFlag',
  ...fields
})
