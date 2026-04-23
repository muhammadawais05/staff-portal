import { Client, JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '../../request-stubs'

const updatePendingTalentReasonMock = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.PENDING_ENGINEER,
      operations: jobOperationsMock({
        updateJobPendingTalentReason: enabledOperationMock()
      }),
      client: { enterprise: true } as unknown as Client
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('111', 'Job'),
          operations: {
            updateJobPendingTalentReason: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    JobPendingTalentReasons: {
      data: {
        jobPendingTalentReasons: [
          'Finding talent',
          'Waiting on client',
          'Contracts',
          'Sourcing',
          'Background Check'
        ]
      }
    },
    UpdateTalentPendingReason: {
      data: {
        updateJobPendingTalentReason: successMutationMock()
      }
    }
  })
}

export default updatePendingTalentReasonMock
