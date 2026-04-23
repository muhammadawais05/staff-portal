import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const deleteJobStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: getJobOperations({ removeJob: enabledOperationMock() })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            removeJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    RemoveJob: {
      data: {
        removeJob: successMutationMock()
      }
    }
  })

export default deleteJobStubs
