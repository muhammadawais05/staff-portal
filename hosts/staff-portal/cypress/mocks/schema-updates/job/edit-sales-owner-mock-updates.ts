import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updateSalesOwnerMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      operations: jobOperationsMock({
        updateJobSalesOwner: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('333', 'Job'),
          operations: {
            updateJobSalesOwner: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    GetSalesOwnersData: {
      data: {
        rolesV2: {
          nodes: [
            {
              id: 'VjEtU3RhZmYtMTI4NDk5',
              fullName: 'Robert Estes',
              __typename: 'Staff'
            }
          ],
          __typename: 'StaffConnection'
        }
      }
    },
    UpdateJobSalesOwner: {
      data: {
        updateJobSalesOwner: successMutationMock()
      }
    }
  })
}

export default updateSalesOwnerMock
