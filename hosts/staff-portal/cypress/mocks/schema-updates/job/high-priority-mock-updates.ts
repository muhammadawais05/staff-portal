import { JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updateHighPriorityMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: jobOperationsMock({
        setJobPriority: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('111', 'Job'),
          operations: {
            setJobPriority: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    SetJobPriority: {
      data: {
        setJobPriority: successMutationMock()
      }
    }
  })
}

export default updateHighPriorityMock
