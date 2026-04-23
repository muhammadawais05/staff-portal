import { encodeEntityId } from '@staff-portal/data-layer-service'
import { JobStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'
import { getCloneJobInfoResponse } from '~integration/mocks/responses'

const updateJobCloneStubs = () =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.REMOVED,
      operations: getJobOperations({ cloneJob: enabledOperationMock() })
    }),
    GetCloneJobInfo: getCloneJobInfoResponse(),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            cloneJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    CloneJob: {
      data: {
        cloneJob: successMutationMock({
          jobClone: {
            id: encodeEntityId('123', 'Job')
          }
        })
      }
    }
  })

export default updateJobCloneStubs
