import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getStaffProfileOperations } from '~integration/mocks/responses'
import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { staffProfilePageStubs } from '~integration/mocks/request-stubs'

export const updateStaffProfileRestoreStubs = () => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs({
      operations: getStaffProfileOperations({
        deactivateStaff: hiddenOperationMock(),
        reactivateStaff: enabledOperationMock()
      })
    }),
    GetStaffFullName: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          fullName: 'Ashleigh Alexander',
          __typename: 'Staff'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          operations: {
            reactivateStaff: enabledOperationMock(),
            __typename: 'StaffOperations'
          },
          __typename: 'Staff'
        }
      }
    },
    ReactivateStaff: {
      data: {
        reactivateStaff: {
          staff: {
            id: encodeEntityId('123', 'Staff'),
            __typename: 'Staff'
          },
          success: true,
          errors: [],
          __typename: 'ReactivateStaffPayload'
        }
      }
    }
  })
}
