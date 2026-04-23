import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

const testFlag = {
  id: encodeEntityId('123', 'RoleFlag'),
  comment: 'test',
  flaggedBy: {
    id: encodeEntityId('123', 'Staff'),
    fullName: 'Alexander Danilenko',
    __typename: 'Staff'
  },
  createdAt: '2022-02-05T22:29:42+03:00',
  updatedAt: '2022-02-05T22:29:42+03:00',
  flag: {
    id: encodeEntityId('123', 'Flag'),
    color: null,
    title: 'Type A Quality Talent',
    __typename: 'Flag'
  },
  operations: {
    removeRoleFlag: enabledOperationMock(),
    updateRoleFlag: enabledOperationMock(),
    __typename: 'RoleFlagOperations'
  },
  __typename: 'RoleFlag'
}

export const getTalentRoleFlagsResponse = (talent?: Partial<Talent>) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Talent'),
      roleFlags: {
        nodes: [testFlag],
        __typename: 'RoleFlagConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
