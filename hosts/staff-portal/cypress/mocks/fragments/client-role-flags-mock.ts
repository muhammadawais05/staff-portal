import { encodeEntityId } from '@staff-portal/data-layer-service'
import { FlagColor, RoleFlag } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '../enabled-operation-mock'

export const clientRoleFlagMock = (
  roleFlag: Partial<RoleFlag> | undefined = {}
) =>
  ({
    id: encodeEntityId('123', 'RoleFlag'),
    comment: 'This part was obfuscated, some content was here.',
    flaggedBy: {
      id: 'VjEtU3RhZmYtMzY3ODc3',
      fullName: 'Redmon Rufino',
      __typename: 'Staff'
    },
    createdAt: '2021-07-14T04:55:27+03:00',
    updatedAt: '2021-07-14T04:55:27+03:00',
    flag: {
      id: encodeEntityId('123', 'Flag'),
      color: FlagColor.ORANGE,
      title: 'Medium LTV',
      __typename: 'Flag'
    },
    operations: {
      removeRoleFlag: enabledOperationMock(),
      updateRoleFlag: enabledOperationMock(),
      __typename: 'RoleFlagOperations'
    },
    __typename: 'RoleFlag',
    ...roleFlag
  } as RoleFlag)

export const roleFlagsMock = () => ({
  roleFlags: {
    nodes: [clientRoleFlagMock()]
  }
})
