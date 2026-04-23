import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getStaffProfileOperations } from '~integration/mocks/responses'
import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { staffProfilePageStubs } from '~integration/mocks/request-stubs'

export const updateStaffProfileDeleteStubs = () => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs({
      operations: getStaffProfileOperations({
        deactivateStaff: enabledOperationMock(),
        reactivateStaff: hiddenOperationMock()
      })
    }),
    GetStaffHasPendingTasks: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          hasPendingTasks: false,
          __typename: 'Staff'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Staff'),
          operations: {
            deactivateStaff: enabledOperationMock(),
            __typename: 'StaffOperations'
          },
          __typename: 'Staff'
        }
      }
    },
    DeactivateStaff: {
      data: {
        deactivateStaff: {
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
