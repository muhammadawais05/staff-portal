import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const postponeJobStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: getJobOperations({ postponeJob: enabledOperationMock() })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            postponeJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    PostponeJob: {
      data: {
        postponeJob: successMutationMock()
      }
    }
  })

export default postponeJobStubs
