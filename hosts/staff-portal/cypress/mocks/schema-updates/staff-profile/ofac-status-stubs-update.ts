import { encodeEntityId } from '@staff-portal/data-layer-service'

import { OperationValue } from '~integration/types'
import { successOperationMock } from '~integration/mocks/operations'
import { enabledOperationMock } from '~integration/mocks'
import { staffProfilePageStubs } from '~integration/mocks/request-stubs'

export const updateStaffProfileOfacStatus = (
  operationValues: { [key: string]: OperationValue } | undefined = {}
) => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs(),
    UpdateRoleOfacStatus: {
      data: {
        updateRoleOfacStatus: successOperationMock()
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          operations: {
            updateRoleOfacStatus: enabledOperationMock(),
            __typename: 'StaffOperations'
          },
          __typename: 'Staff'
        }
      }
    },
    ...operationValues
  })
}
