import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updateJobEstimatedEndDateMocks = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: jobOperationsMock({
        updateJobEstimatedEndDate: enabledOperationMock()
      })
    }),
    UpdateJobEstimatedEndDate: {
      data: {
        updateJobEstimatedEndDate: successMutationMock()
      }
    }
  })
}

export default updateJobEstimatedEndDateMocks
