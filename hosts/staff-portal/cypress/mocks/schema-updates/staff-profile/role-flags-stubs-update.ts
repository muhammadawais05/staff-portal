import { staffProfilePageStubs } from '~integration/mocks/request-stubs'
import {
  getRoleFlagsLazyOperations,
  getRoleMissingFlags
} from '~integration/mocks/responses'
import { OperationValue } from '~integration/types'
import { successMutationMock } from '~integration/mocks/mutations'

export const updateRoleFlagsStaffProfileStubs = (
  operationValues: { [key: string]: OperationValue } | undefined = {}
) => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs(),
    GetLazyOperation: getRoleFlagsLazyOperations('Staff'),
    GetRoleMissingFlags: getRoleMissingFlags('Staff'),
    AddRoleFlag: {
      data: {
        addRoleFlag: successMutationMock({ __typename: 'AddRoleFlagPayload' })
      }
    },
    UpdateRoleFlag: {
      data: {
        updateRoleFlag: successMutationMock({
          __typename: 'UpdateRoleFlagPayload'
        })
      }
    },
    RemoveRoleFlag: {
      data: {
        removeRoleFlag: successMutationMock({
          __typename: 'RemoveRoleFlagPayload'
        })
      }
    },
    ...operationValues
  })
}
