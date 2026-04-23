import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successOperationMock } from '~integration/mocks/operations'
import { enabledOperationMock } from '~integration/mocks'
import { jobApplicationPageStubs } from '~integration/mocks/request-stubs'

export const updateRejectJobApplicationMocks = () => {
  cy.stubGraphQLRequests({
    ...jobApplicationPageStubs(),
    RejectJobApplicant: {
      data: {
        rejectJobApplicant: successOperationMock()
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'JobApplication'),
          operations: {
            rejectJobApplicant: enabledOperationMock(),
            __typename: 'JobApplicationOperations'
          },
          __typename: 'JobApplication'
        }
      }
    }
  })
}
