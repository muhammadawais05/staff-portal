import {
  ClientTransferRoleRequestRelationship,
  ClientTransferRoleRequestStatus
} from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { ClientTransferRoleRequestFragment } from './get-transfer-request.staff.gql.types'

export const createTransferRequestMock = (
  data?: Partial<ClientTransferRoleRequestFragment>
): ClientTransferRoleRequestFragment => ({
  id: 'VjEtQ2xpZW50VHJhbnNmZXJSb2xlUmVxdWVzdC00MzY2',
  status: ClientTransferRoleRequestStatus.PENDING,
  relationship: ClientTransferRoleRequestRelationship.CLAIMER,
  comment: 'some info',
  requester: {
    id: 'VjEtU3RhZmYtNjgzODM0',
    fullName: 'Ali Hammoud'
  },
  requestedTransfer: {
    id: 'VjEtU3RhZmYtMjYyMDAzMg',
    fullName: 'Margie Yost'
  },
  operations: {
    confirmClientTransferRoleRequest: createOperationMock(),
    rejectClientTransferRoleRequest: createOperationMock()
  },
  ...data
})
