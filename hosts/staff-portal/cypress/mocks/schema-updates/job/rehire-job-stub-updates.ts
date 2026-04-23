import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const rehireJobStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.CLOSED,
      operations: getJobOperations({
        cloneJobForRehire: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            cloneJobForRehire: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    CloneJobForRehire: {
      data: {
        cloneJobForRehire: successMutationMock()
      }
    }
  })

export default rehireJobStubs
