import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OfacStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'

export const getStaffOfacStatusResponse = (
  statusChanges: any | undefined = [],
  ofacStatus = OfacStatus.NORMAL
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Staff'),
      fullName: 'Ashleigh Alexander',
      staffCumulativeStatus: 'ACTIVE',
      ofacStatus,
      ofacStatusChanges: {
        nodes: [...statusChanges],
        __typename: 'OfacStatusChangeConnection'
      },
      staffAssociatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      operations: {
        updateRoleOfacStatus: enabledOperationMock(),
        __typename: 'StaffOperations'
      },
      __typename: 'Staff'
    }
  }
})
