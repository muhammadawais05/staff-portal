import { JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updatePreSalesEngagementMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.PENDING_ENGINEER,
      operations: jobOperationsMock({
        updateJobPresalesEngagement: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('333', 'Job'),
          operations: {
            updateJobPresalesEngagement: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    UpdateJobPresalesEngagement: {
      data: {
        updateJobPresalesEngagement: successMutationMock()
      }
    }
  })
}

export default updatePreSalesEngagementMock
