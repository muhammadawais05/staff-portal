import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job, JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const updateJobEditStubs = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: getJobOperations({ removeJob: enabledOperationMock() }),
      ...job
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: job?.id ?? encodeEntityId('123', 'Job'),
          operations: {
            removeJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    UpdateJob: {
      data: { updateJob: successMutationMock() }
    },
    RemoveJob: {
      data: {
        removeJob: successMutationMock()
      }
    }
  })

export default updateJobEditStubs
